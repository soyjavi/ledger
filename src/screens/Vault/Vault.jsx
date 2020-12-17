import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import {
  Banner,
  DialogClone,
  Footer,
  GroupTransactions,
  Header,
  Heading,
  ScrollView,
  Search,
  Summary,
} from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogTransaction } from './components';
import { onScroll, query, search } from './Vault.controller';

const { COLOR, ICON } = THEME;

const buttonProps = {
  color: COLOR.BASE,
  colorText: COLOR.TEXT,
  iconFamily: ICON.FAMILY,
};

const Vault = ({ visible }) => {
  const l10n = useL10N();
  const { params, ...navigation } = useNavigation();
  const { baseCurrency, vaults } = useStore();
  const scrollview = useRef(null);

  const [dataSource, setDataSource] = useState({});
  const [dialog, setDialog] = useState(undefined);
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [txs, setTxs] = useState([]);
  const [tx, setTx] = useState(undefined);
  const [searchTxs, setSearchTxs] = useState(undefined);
  const [searching, setSearching] = useState(false);

  useLayoutEffect(() => {
    if (!visible) {
      scrollview.current.scrollTo({ y: 0, animated: false });
      setDialog(undefined);
    }
  }, [visible]);

  useEffect(() => {
    if (params.vault) refreshDatasource(vaults.find((vault) => vault.hash === params.vault.hash));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    const { currentBalance, txs: currentTxs, hash } = dataSource;
    if (visible && params.vault.hash === hash) {
      const vault = vaults.find((vault) => vault.hash === hash);
      if (vault.currentBalance !== currentBalance || vault.txs.length !== currentTxs.length) refreshDatasource(vault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaults, visible]);

  const handleScroll = onScroll.bind(undefined, {
    dataSource,
    scrollQuery,
    setScroll,
    setScrollQuery,
    setTxs,
  });

  const refreshDatasource = (vault) => {
    setDataSource(vault);
    setTxs(query(vault.txs));
    setScrollQuery(false);
  };

  const handleSearch = (query) => {
    setSearchTxs(query ? search(query, dataSource.txs, l10n) : undefined);
  };
  const { currency = baseCurrency, title, ...rest } = dataSource;

  console.log('  <Vault>', { visible, dialog });

  return (
    <Viewport scroll={false} visible={visible}>
      <Header highlight={scroll} title={title} onBack={navigation.back} />

      <ScrollView onScroll={handleScroll} ref={scrollview}>
        <Summary {...rest} title={title} currency={currency}>
          <Button {...buttonProps} icon="arrow-up" onPress={() => setDialog(1)} text={l10n.INCOME.toUpperCase()} />
          <Button {...buttonProps} icon="arrow-down" onPress={() => setDialog(0)} text={l10n.EXPENSE.toUpperCase()} />
          {vaults.length > 1 && (
            <Button {...buttonProps} icon="shuffle" onPress={() => setDialog(2)} text={l10n.SWAP.toUpperCase()} />
          )}
        </Summary>

        {txs.length > 0 ? (
          <>
            <Heading paddingHorizontal="M" value={l10n.TRANSACTIONS} />
            {(searchTxs || txs).map((item) => (
              <GroupTransactions key={item.timestamp} {...item} currency={currency} onPress={setTx} />
            ))}
          </>
        ) : (
          <Banner
            image={BANNERS.NOT_FOUND}
            paddingHorizontal="M"
            paddingVertical="M"
            small
            title={l10n.NO_TRANSACTIONS}
          />
        )}
      </ScrollView>

      <Footer visible={scroll || searchTxs !== undefined}>
        <Search {...buttonProps} onFocus={setSearching} onSearch={handleSearch} />

        <Button
          {...buttonProps}
          icon="arrow-up"
          iconFamily={ICON.FAMILY}
          onPress={() => setDialog(1)}
          text={!searching ? l10n.INCOME.toUpperCase() : undefined}
        />
        <Button
          {...buttonProps}
          icon="arrow-down"
          iconFamily={ICON.FAMILY}
          onPress={() => setDialog(0)}
          text={!searching ? l10n.EXPENSE.toUpperCase() : undefined}
        />
        {vaults.length > 1 && (
          <Button
            {...buttonProps}
            icon="shuffle"
            iconFamily={ICON.FAMILY}
            onPress={() => setDialog(2)}
            text={!searching ? l10n.SWAP.toUpperCase() : undefined}
          />
        )}
      </Footer>

      {visible && (
        <>
          <DialogTransaction
            currency={currency}
            onClose={() => setDialog(undefined)}
            type={dialog}
            vault={dataSource}
            visible={visible && dialog !== undefined}
          />
          <DialogClone dataSource={tx} onClose={() => setTx(undefined)} visible={tx !== undefined} />
        </>
      )}
    </Viewport>
  );
};

Vault.propTypes = {
  visible: PropTypes.bool,
};

export { Vault };

import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner, DialogClone, GroupTransactions, Header, Heading, ScrollView, Summary } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogTransaction } from './components';
import { onScroll, query } from './Vault.controller';

const { COLOR, ICON } = THEME;

const {
  TX: {
    TYPE: { INCOME, EXPENSE, TRANSFER },
  },
} = C;

const button = {
  color: COLOR.CTA,
  iconFamily: ICON.FAMILY,
  outlined: true,
};

const Vault = ({ visible }) => {
  const l10n = useL10N();
  const { params, ...navigation } = useNavigation();
  const { baseCurrency, vaults } = useStore();
  const scrollview = useRef(null);

  const [dataSource, setDataSource] = useState({});
  const [dialog, setDialog] = useState();
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [txs, setTxs] = useState([]);
  const [tx, setTx] = useState(undefined);

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

  const { currency = baseCurrency, title, ...rest } = dataSource;

  console.log('  <Vault>', { visible, dialog });

  return (
    <Viewport scroll={false} visible={visible}>
      <Header visible={scroll} title={scroll ? title : undefined} onBack={navigation.back} />

      <ScrollView onScroll={handleScroll} ref={scrollview}>
        <Summary {...rest} title={title} currency={currency}>
          <Button {...button} icon="arrow-up" onPress={() => setDialog(INCOME)} text={l10n.INCOME.toUpperCase()} />
          <Button {...button} icon="arrow-down" onPress={() => setDialog(EXPENSE)} text={l10n.EXPENSE.toUpperCase()} />
          {vaults.length > 1 && (
            <Button {...button} icon="shuffle" onPress={() => setDialog(TRANSFER)} text={l10n.SWAP.toUpperCase()} />
          )}
        </Summary>

        {txs.length > 0 ? (
          <>
            <Heading paddingHorizontal="M" value={l10n.TRANSACTIONS} />
            {txs.map((item) => (
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

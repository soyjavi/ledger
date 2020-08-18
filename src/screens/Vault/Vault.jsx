import { bool } from 'prop-types';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Viewport } from 'reactor/components';

import { BANNERS, FLAGS } from '@assets';
import {
  Banner,
  ButtonBack,
  DialogClone,
  GroupTransactions,
  Header,
  Heading,
  Option,
  ScrollView,
  Summary,
} from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogTransaction } from './components';
import { onScroll, query } from './modules';
import styles from './Vault.style';

const Vault = ({ visible, ...inherit }) => {
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

  useLayoutEffect(() => {
    if (params.vault) {
      scrollview.current.scrollTo({ y: 0, animated: false });
      setDialog(undefined);
    }
  }, [params.vault]);

  useEffect(() => {
    if (params.vault) refreshDatasource(vaults.find((vault) => vault.hash === params.vault.hash));
  }, [params]);

  useEffect(() => {
    const { currentBalance, txs: currentTxs, hash } = dataSource;
    if (visible && params.vault.hash === hash) {
      const vault = vaults.find((vault) => vault.hash === hash);
      if (vault.currentBalance !== currentBalance || vault.txs.length !== currentTxs.length) refreshDatasource(vault);
    }
  }, [visible, vaults]);

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
  const vaultProps = { ...rest, image: FLAGS[currency], title };

  console.log('  <Vault>', { visible, dialog });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} {...vaultProps} onBack={scroll ? navigation.back : undefined} />

      <ScrollView onScroll={handleScroll} ref={scrollview} style={styles.container}>
        <Summary {...vaultProps} currency={currency}>
          <Option icon="arrow-up" onPress={() => setDialog(1)} caption={l10n.INCOME} />
          <Option icon="arrow-down" onPress={() => setDialog(0)} caption={l10n.EXPENSE} />
          {vaults.length > 1 ? (
            <Option icon="shuffle" onPress={() => setDialog(2)} caption={l10n.TRANSFER} />
          ) : undefined}
        </Summary>

        {txs.length > 0 ? (
          <>
            <Heading paddingHorizontal="M" small value={l10n.TRANSACTIONS} />
            {txs.map((item) => (
              <GroupTransactions key={item.timestamp} {...item} currency={currency} onPress={setTx} />
            ))}
          </>
        ) : (
          <Banner image={BANNERS.NOT_FOUND} paddingHorizontal="M" paddingVertical="M" title={l10n.NO_TRANSACTIONS} />
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

      <ButtonBack onPress={navigation.back} visible={visible && dialog === undefined && tx === undefined} />
    </Viewport>
  );
};

Vault.propTypes = {
  visible: bool,
};

export default React.memo(Vault);

import { bool } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Viewport } from 'reactor/components';

import { BANNERS, FLAGS } from '@assets';
import { Banner, Footer, GroupTransactions, Header, Heading, Option, ScrollView, Summary } from '@components';
import { useConnection, useL10N, useNavigation, useStore } from '@context';

import { DialogTransaction } from './components';
import { onScroll, query } from './modules';
import styles from './Vault.style';

const Vault = ({ visible, ...inherit }) => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const { params, ...navigation } = useNavigation();
  const store = useStore();
  const scrollview = useRef(null);

  const [dataSource, setDataSource] = useState(inherit.dataSource);
  const [dialog, setDialog] = useState(undefined);
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (visible) {
      const { hash } = params.vault;
      const vault = store.vaults.find((vault) => vault.hash === hash);
      setTxs(query({ l10n, txs: vault.txs }));
      setDataSource(vault);
    } else {
      setDialog(false);
    }
  }, [visible, store]);

  useEffect(() => {
    if (!visible) {
      scrollview.current.scrollTo({ y: 0, animated: false });
      setDataSource(undefined);
      setScrollQuery(false);
    }
  }, [visible]);

  const bindings = { l10n, dataSource, setTxs };
  const handleScroll = onScroll.bind(undefined, {
    ...bindings,
    scroll,
    scrollQuery,
    setScroll,
    setScrollQuery,
  });

  const { currency = store.baseCurrency, title, ...rest } = dataSource || params.vault || {};
  const vaultProps = { ...rest, image: FLAGS[currency], title };

  console.log('  <Vault>', { visible, dialog });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} {...vaultProps} />

      <ScrollView onScroll={handleScroll} ref={scrollview} style={styles.container}>
        <Summary {...vaultProps} currency={currency}>
          <Option disabled={!connected} icon="arrow-up" onPress={() => setDialog(1)} caption={l10n.INCOME} />
          <Option disabled={!connected} icon="arrow-down" onPress={() => setDialog(0)} caption={l10n.EXPENSE} />
          {store.vaults.length > 1 ? (
            <Option disabled={!connected} icon="shuffle" onPress={() => setDialog(2)} caption={l10n.TRANSFER} />
          ) : (
            undefined
          )}
        </Summary>

        {txs.length > 0 ? (
          <>
            <Heading paddingHorizontal="M" small value={l10n.TRANSACTIONS} />
            {txs.map((item) => (
              <GroupTransactions key={item.timestamp} {...item} currency={currency} />
            ))}
          </>
        ) : (
          <Banner image={BANNERS.NOT_FOUND} paddingHorizontal="M" paddingVertical="M" title={l10n.NO_TRANSACTIONS} />
        )}
      </ScrollView>

      <Footer onBack={navigation.back} onHardwareBack={visible ? navigation.back : undefined} visible={!scroll} />

      {visible && dataSource && (
        <DialogTransaction
          currency={currency}
          onClose={() => setDialog(undefined)}
          type={dialog}
          vault={dataSource}
          visible={visible && dialog !== undefined}
        />
      )}
    </Viewport>
  );
};

Vault.propTypes = {
  visible: bool,
};

Vault.defaultProps = {
  visible: true,
};

export default React.memo(Vault);

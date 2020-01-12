import { bool } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { FLAGS } from '../../assets';
import { Footer, GroupTransactions, Header, Heading, Summary } from '../../components';
import { useL10N, useNavigation, useStore } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import { DialogTransaction, Search } from './components';
import { onScroll, onSearch, query } from './modules';
import styles from './Vault.style';

const Vault = ({ visible, ...inherit }) => {
  const l10n = useL10N();
  const { params, ...navigation } = useNavigation();
  const store = useStore();
  const [dataSource, setDataSource] = useState(undefined);
  const [dialog, setDialog] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [search, setSearch] = useState(undefined);
  const [txs, setTxs] = useState([]);
  const scrollview = useRef(null);

  useEffect(() => {
    if (visible) {
      const { hash } = params.Vault || {};
      const vault = store.vaults.find((vault) => vault.hash === hash) || {};
      setDataSource(vault);
      setTxs(query({ l10n, txs: vault.txs }));
    }
  }, [visible, store]);

  useEffect(() => {
    if (!visible) {
      scrollview.current.scrollTo({ y: 0, animated: false });
      setScrollQuery(false);
      setSearch(undefined);
    }
  }, [visible]);

  const handleHardwareBack = () => {
    if (dialog) setDialog(false);
    else navigation.back();
  };

  const bindings = { l10n, dataSource, setTxs };
  const handleScroll = onScroll.bind(undefined, { ...bindings, scrollQuery, search, setScroll, setScrollQuery });
  const handleSearch = onSearch.bind(undefined, { ...bindings, setSearch });

  const { currency, title } = dataSource || params.Vault || {};
  const headingProps = { image: FLAGS[currency], title: `${title} ${l10n.BALANCE}` };

  console.log('  <Vault>', { visible, dialog, scroll, scrollQuery, search });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} {...headingProps} />
      <ScrollView onScroll={handleScroll} ref={scrollview} scrollEventThrottle={40} style={styles.container}>
        <Summary {...dataSource} {...headingProps} />
        <Search onValue={handleSearch} value={search} />

        {txs.length > 0 ? (
          <>
            <Heading value={l10n.TRANSACTIONS} />
            <View style={styles.content}>
              {txs.map((item) => (
                <GroupTransactions key={`${item.timestamp}-${search}`} {...item} currency={currency} />
              ))}
            </View>
          </>
        ) : (
          <View style={[styles.centered, styles.container]}>
            <Text lighten>{l10n.NO_TRANSACTIONS}</Text>
          </View>
        )}
      </ScrollView>

      <Footer
        onBack={navigation.back}
        onHardwareBack={visible ? handleHardwareBack : undefined}
        onPress={() => setDialog(true)}
      />

      {visible && dataSource && (
        <DialogTransaction
          currency={currency}
          onClose={() => setDialog(false)}
          vault={dataSource.hash}
          visible={dialog}
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

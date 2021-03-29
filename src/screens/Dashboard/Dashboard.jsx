import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Slider } from 'reactor/components';

import { C } from '@common';
import {
  Card,
  CARD_SIZE,
  DialogClone,
  GroupTransactions,
  Header,
  Heading,
  ScrollView,
  Search,
  Summary,
} from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogVault } from './components';
import { queryLastTxs, querySearchTxs, queryVaults } from './Dashboard.controller';
import styles from './Dashboard.style';

const { SCREEN } = C;
const { SPACE } = THEME;

const Dashboard = () => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const { settings: { baseCurrency, visibleVaults } = {}, overall, txs = [], vaults = [] } = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [tx, setTx] = useState(undefined);
  const [lastTxs, setLastTxs] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [query, setQuery] = useState();

  useEffect(() => {
    setLastTxs(queryLastTxs({ txs, vaults }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txs]);

  console.log('  <Dashboard>', { txs });

  return (
    <>
      <Header visible={scroll} title={scroll ? l10n.DASHBOARD : undefined} />

      <ScrollView onScroll={setScroll}>
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE}>
          <Search onChange={setQuery} />
        </Summary>

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" value={l10n.VAULTS} />

            <Slider itemWidth={CARD_SIZE} itemMargin={SPACE.S} style={styles.vaults}>
              {queryVaults({ query, vaults, visibleVaults }).map((vault, index) => (
                <Card
                  {...vault.others}
                  balance={vault.currentBalance}
                  currency={vault.currency}
                  operator
                  title={vault.title}
                  key={vault.hash}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  onPress={() => navigation.go(SCREEN.VAULT, vault)}
                />
              ))}
              <Card marginRight="M" onPress={() => setDialogVault(true)} title={`${l10n.NEW} ${l10n.VAULT}`} />
            </Slider>

            {lastTxs.length > 0 && (
              <>
                <Heading marginTop="M" paddingLeft="M" paddingRight="S" value={l10n.LAST_TRANSACTIONS} />
                {(querySearchTxs({ l10n, query, txs, vaults }) || lastTxs).map((item) => (
                  <GroupTransactions {...item} key={`${item.timestamp}`} currency={baseCurrency} onPress={setTx} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <DialogClone dataSource={tx} onClose={() => setTx(undefined)} visible={tx !== undefined} />
      <DialogVault onClose={() => setDialogVault(false)} visible={dialogVault} />
    </>
  );
};

Dashboard.propTypes = {};

export { Dashboard };

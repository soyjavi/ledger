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
  const [searchTxs, setSearchTxs] = useState(undefined);

  useEffect(() => {
    setLastTxs(queryLastTxs({ txs, vaults }));
  }, [txs, vaults]);

  const handleSearch = (query) => {
    setSearchTxs(query ? querySearchTxs({ l10n, query, txs, vaults }) : undefined);
  };

  console.log('  <Dashboard>', { txs });

  return (
    <>
      <Header visible={scroll} title={l10n.OVERALL_BALANCE} />

      <ScrollView onScroll={setScroll}>
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE}>
          <Search onChange={handleSearch} />
        </Summary>

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" value={l10n.VAULTS} />

            <Slider itemWidth={CARD_SIZE} itemMargin={SPACE.S} style={styles.vaults}>
              {queryVaults({ vaults, visibleVaults }).map((vault, index) => (
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
                {(searchTxs || lastTxs).map((item) => (
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

import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { THEME } from '../../reactor/common';
import { Button, Slider, Viewport } from '../../reactor/components';
import { C, onHardwareBackPress } from '../../common';
import {
  DialogSettings,
  DialogVault,
  Footer,
  GroupTransactions,
  Header,
  Heading,
  ScrollView,
  Summary,
} from '../../components';
import { useL10N, useNavigation, useSettings, useStore } from '../../context';
import { Search, VaultCard, VAULTCARD_WIDTH } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN } = C;
const { SPACE } = THEME;

const Dashboard = ({ backward, visible, ...inherit }) => {
  const { state: settings } = useSettings();
  const l10n = useL10N();
  const navigation = useNavigation();
  const { baseCurrency, overall, sync, txs = [], vaults = [] } = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [dialogSettings, setDialogSettings] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [searchTxs, setSearchTxs] = useState(undefined);
  const [lastTxs, setLastTxs] = useState([]);
  const [visibleVaults, setVisibleVaults] = useState([]);

  useEffect(() => {
    onHardwareBackPress(!backward, () => {
      if (dialogVault) setDialogVault(false);
      if (dialogSettings) setDialogSettings(false);
    });
  }, [backward, dialogVault, dialogSettings]);

  useEffect(() => {
    if (sync && vaults.length === 0) setDialogVault(true);
  }, [sync, vaults]);

  useEffect(() => {
    if (visible) setLastTxs(queryLastTxs({ txs, vaults }));
  }, [visible, txs, vaults]);

  useEffect(() => {
    if (visible) setVisibleVaults(queryVaults({ settings, vaults }));
  }, [visible, settings, vaults]);

  console.log('  <Dashboard>', { visible, searchTxs });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} title={l10n.OVERALL_BALANCE} />

      <ScrollView onScroll={setScroll} contentContainerStyle={styles.scroll}>
        <Summary
          {...overall}
          currency={baseCurrency}
          onSettings={() => setDialogSettings(true)}
          title={l10n.OVERALL_BALANCE}
        />

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" paddingRight="S" value={l10n.VAULTS}>
              <Button
                title={l10n.VIEW_ALL}
                onPress={() => navigation.go(SCREEN.VAULTS)}
                size="S"
                style={styles.buttonHeader}
              />
            </Heading>
            <Slider itemWidth={VAULTCARD_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
              {visibleVaults.map((vault) => (
                <VaultCard {...vault} key={vault.hash} onPress={() => navigation.go(SCREEN.VAULT, vault)} />
              ))}
            </Slider>

            {lastTxs.length > 0 && (
              <>
                <Heading paddingHorizontal="M" value={l10n.LAST_TRANSACTIONS} />
                <Search onValue={setSearchTxs} />
                {(searchTxs || lastTxs).map((item) => (
                  <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <Footer onPress={() => setDialogVault(true)} scroll={scroll} />
      {visible && sync && <DialogVault onClose={() => setDialogVault(false)} visible={dialogVault} />}
      <DialogSettings onClose={() => setDialogSettings(false)} visible={dialogSettings} />
    </Viewport>
  );
};

Dashboard.propTypes = {
  backward: bool,
  visible: bool,
};

Dashboard.defaultProps = {
  backward: false,
  visible: true,
};

export default React.memo(Dashboard);

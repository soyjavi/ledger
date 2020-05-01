import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Slider, Viewport } from 'reactor/components';

import { C, onHardwareBackPress } from '@common';
import {
  DialogSettings,
  DialogVault,
  Footer,
  GroupTransactions,
  Header,
  Heading,
  Option,
  ScrollView,
  Summary,
} from '@components';
import { useConnection, useL10N, useNavigation, useSettings, useStore } from '@context';

import { Search, VaultCard, VAULTCARD_WIDTH } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN } = C;
const { COLOR, SPACE } = THEME;

const ButtonProps = {
  color: COLOR.BACKGROUND,
  colorText: COLOR.TEXT,
  size: 'S',
  style: styles.smallButton,
};

export const Dashboard = ({ backward, visible, ...inherit }) => {
  const { connected } = useConnection();
  const { state: settings } = useSettings();
  const l10n = useL10N();
  const navigation = useNavigation();
  const { baseCurrency, overall, sync, txs = [], vaults = [] } = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [dialogSettings, setDialogSettings] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [search, setSearch] = useState(false);
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
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE}>
          <Option icon="chart" onPress={() => navigation.go(SCREEN.STATS)} caption={l10n.ACTIVITY} />
          <Option disabled={!connected} icon="wallet" onPress={() => setDialogVault(true)} caption={l10n.VAULT} />
          <Option
            disabled={!connected}
            icon="settings"
            onPress={() => setDialogSettings(true)}
            caption={l10n.SETTINGS}
          />
        </Summary>

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" paddingRight="S" small value={l10n.VAULTS}>
              <Button {...ButtonProps} title={l10n.VIEW_ALL} onPress={() => navigation.go(SCREEN.VAULTS)} />
            </Heading>
            <Slider itemWidth={VAULTCARD_WIDTH} itemMargin={SPACE.S} style={styles.vaults}>
              {visibleVaults.map((vault, index) => (
                <VaultCard
                  {...vault}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  key={vault.hash}
                  onPress={() => navigation.go(SCREEN.VAULT, vault)}
                />
              ))}
            </Slider>

            {lastTxs.length > 0 && (
              <>
                <Heading paddingLeft="M" paddingRight="S" small value={l10n.LAST_TRANSACTIONS}>
                  <Button {...ButtonProps} title={l10n.SEARCH} onPress={() => setSearch(!search)} />
                </Heading>
                {search && <Search onValue={setSearchTxs} />}
                {(searchTxs || lastTxs).map((item) => (
                  <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <Footer visible={!scroll} showSync />

      {visible && sync && (
        <>
          <DialogVault onClose={() => setDialogVault(false)} visible={dialogVault} />
          <DialogSettings onClose={() => setDialogSettings(false)} visible={dialogSettings} />
        </>
      )}
    </Viewport>
  );
};

Dashboard.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};

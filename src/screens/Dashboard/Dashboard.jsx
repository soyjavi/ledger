import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Slider, Viewport } from '../../reactor/components';
import { C, onHardwareBackPress } from '../../common';
import { Footer, GroupTransactions, Header, Heading, Summary } from '../../components';
import { useL10N, useNavigation, useSettings, useStore } from '../../context';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const {
  SCREEN,
  STYLE: { VAULT_ITEM_WIDTH },
} = C;
const { SPACE } = THEME;

const Dashboard = ({ backward, visible, ...inherit }) => {
  const { state: settings } = useSettings();
  const l10n = useL10N();
  const navigation = useNavigation();
  const { baseCurrency, overall, sync, txs = [], vaults = [] } = useStore();

  const [dialog, setDialog] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [lastTxs, setLastTxs] = useState([]);
  const [visibleVaults, setVisibleVaults] = useState([]);

  useEffect(() => {
    onHardwareBackPress(!backward, () => {
      if (dialog) setDialog(false);
    });
  }, [backward, dialog]);

  useEffect(() => {
    if (sync && vaults.length === 0) setDialog(true);
  }, [sync, vaults]);

  useEffect(() => {
    if (visible) setLastTxs(queryLastTxs({ txs, vaults }));
  }, [visible, txs, vaults]);

  useEffect(() => {
    if (visible) setVisibleVaults(queryVaults({ settings, vaults }));
  }, [visible, settings, txs, vaults]);

  console.log('  <Dashboard>', { visible, sync, vaults, dialog, scroll, lastTxs, visibleVaults });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} title={l10n.OVERALL_BALANCE}>
        <Button
          contained={false}
          icon="settings-outline"
          iconSize={24}
          onPress={() => navigation.go(SCREEN.SETTINGS)}
          small
        />
      </Header>
      <ScrollView
        onScroll={({ nativeEvent: { contentOffset } }) => setScroll(contentOffset.y > SPACE.MEDIUM)}
        scrollEventThrottle={40}
        contentContainerStyle={styles.scroll}
      >
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE} />

        {vaults.length > 0 && (
          <>
            <Heading value={l10n.VAULTS} style={styles.headingVaults}>
              <Button
                contained={false}
                icon="eye-outline"
                iconSize={24}
                onPress={() => navigation.go(SCREEN.VAULTS)}
                small
              />
            </Heading>
            <Slider itemWidth={VAULT_ITEM_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
              {visibleVaults.map((vault) => (
                <VaultCard {...vault} key={vault.hash} onPress={() => navigation.go(SCREEN.VAULT, vault)} />
              ))}
            </Slider>

            {lastTxs.length > 0 && (
              <>
                <Heading value={l10n.LAST_TRANSACTIONS} />
                <View style={styles.content}>
                  {lastTxs.map((item) => (
                    <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>

      <Syncing scroll={scroll} />
      <Footer onPress={() => setDialog(true)} />
      {visible && sync && <DialogVault visible={dialog} onClose={() => setDialog(false)} />}
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

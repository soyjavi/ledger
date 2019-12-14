import { bool } from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import { C, onHardwareBackPress } from '../../common';
import {
  ButtonMore, Footer, GroupTransactions, Header, Heading, Summary,
} from '../../components';
import { Consumer, useNavigation, useSettings } from '../../context';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH } } = C;
const { SPACE } = THEME;

const Dashboard = ({ backward, visible, ...inherit }) => {
  const [dialog, setDialog] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { state: settings } = useSettings();
  const navigation = useNavigation();

  useEffect(() => {
    onHardwareBackPress(!backward, () => { if (dialog) setDialog(false); });
  }, [backward, dialog]);

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      { visible && (
        <Consumer>
          { ({
            l10n,
            store: {
              baseCurrency, overall, sync, txs, vaults,
            },
          }) => (
            <Fragment>
              <Header
                highlight={scroll}
                right={{ title: l10n.SETTINGS, onPress: () => navigation.navigate(SCREEN.SETTINGS) }}
                title={l10n.OVERALL_BALANCE}
              />
              <ScrollView
                onScroll={({ nativeEvent: { contentOffset } }) => setScroll(contentOffset.y > SPACE.MEDIUM)}
                scrollEventThrottle={40}
                contentContainerStyle={styles.scroll}
              >
                <Summary
                  {...overall}
                  currency={baseCurrency}
                  title={l10n.OVERALL_BALANCE}
                />

                <Heading subtitle={l10n.VAULTS}>
                  <ButtonMore title={l10n.MORE} onPress={() => navigation.navigate(SCREEN.VAULTS)} />
                </Heading>
                <Slider itemWidth={VAULT_ITEM_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
                  { queryVaults({ settings, vaults }).map((vault) => (
                    <VaultCard {...vault} key={vault.hash} onPress={() => navigation.navigate(SCREEN.VAULT, vault)} />
                  ))}
                </Slider>

                <Heading subtitle={l10n.LAST_TRANSACTIONS} />
                { queryLastTxs({ txs, vaults }).map((item) => (
                  <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />))}
              </ScrollView>

              <Syncing scroll={scroll} />

              <Footer onPress={() => setDialog(true)} />

              { visible && sync && (
                <Fragment>
                  { vaults.length === 0 && !dialog && setDialog(true) }
                  <DialogVault baseCurrency={baseCurrency} visible={dialog} onClose={() => setDialog(false)} />
                </Fragment>
              )}
            </Fragment>
          )}
        </Consumer>
      )}

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

export default Dashboard;

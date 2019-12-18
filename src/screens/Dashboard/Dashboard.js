import { bool } from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import { C, onHardwareBackPress } from '../../common';
import {
  ButtonMore, Footer, GroupTransactions, Header, Heading, Summary,
} from '../../components';
import {
  useL10N, useNavigation, useSettings, useStore,
} from '../../context';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH } } = C;
const { SPACE } = THEME;

const Dashboard = ({ backward, visible, ...inherit }) => {
  const { state: settings } = useSettings();
  const l10n = useL10N();
  const navigation = useNavigation();
  const {
    baseCurrency, overall, sync, txs, vaults,
  } = useStore();

  const [dialog, setDialog] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    onHardwareBackPress(!backward, () => { if (dialog) setDialog(false); });
  }, [backward, dialog]);

  console.log('<Dashboard>');

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header
        highlight={scroll}
        right={{ title: l10n.SETTINGS, onPress: () => navigation.go(SCREEN.SETTINGS) }}
        title={l10n.OVERALL_BALANCE}
      />
      <ScrollView
        onScroll={({ nativeEvent: { contentOffset } }) => setScroll(contentOffset.y > SPACE.MEDIUM)}
        scrollEventThrottle={40}
        contentContainerStyle={styles.scroll}
      >
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE} />

        <Heading subtitle={l10n.VAULTS}>
          <ButtonMore title={l10n.MORE} onPress={() => navigation.go(SCREEN.VAULTS)} />
        </Heading>
        <Slider itemWidth={VAULT_ITEM_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
          { queryVaults({ settings, vaults }).map((vault) => (
            <VaultCard {...vault} key={vault.hash} onPress={() => navigation.go(SCREEN.VAULT, vault)} />
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
          <DialogVault visible={dialog} onClose={() => setDialog(false)} />
        </Fragment>
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

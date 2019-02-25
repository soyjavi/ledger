import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView } from 'react-native';

import { C } from '../../common';
import {
  BalanceCard, DialogStats, DialogVault, FloatingButton, HeadingItem, StatItem, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import styles from './Dashboard.style';

const { SCREEN, STYLE, TX: { TYPE } } = C;
const { OFFSET } = THEME;
const SLIDER_PROPS = {
  itemMargin: 0,
  itemWidth: STYLE.CARD.width + OFFSET,
  momentum: true,
  navigation: false,
  style: styles.slider,
};

class Dashboard extends PureComponent {
  static propTypes = {
    backward: bool,
    navigation: shape({}),
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    navigation: undefined,
    visible: true,
  };

  state = {
    dialog: false,
    stats: undefined,
  };

  componentWillReceiveProps({ backward }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';

    BackHandler[method]('hardwareBackPress', () => {
      const { state: { dialog } } = this;
      if (dialog) this.setState({ dialog: false, stats: undefined });
      return true;
    });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog, stats: undefined });
  }

  _onVault = ({ navigation, store, vault }) => {
    const { props } = this;

    store.query({ vault: vault.hash, method: 'groupByDay', date: new Date().toISOString().substr(0, 7) });
    navigation.navigate(SCREEN.VAULT, vault, props.navigation);
  }

  _onStats = (stats, { store: { query } }) => {
    query({ method: 'groupByCategory', date: (new Date().toISOString()).substr(0, 7), ...stats });
    this.setState({ dialog: true, stats });
  }

  renderStats = (dataSource, type, { l10n, store }) => {
    const { _onStats } = this;
    const currentMonth = (new Date()).getMonth();

    return (
      <Fragment>
        <HeadingItem title={`${l10n.MONTHS[currentMonth]}'s ${type === TYPE.INCOME ? l10n.INCOMES : l10n.EXPENSES}`} />
        <Slider
          {...SLIDER_PROPS}
          dataSource={dataSource}
          item={({ data }) => <StatItem onPress={() => _onStats({ type, ...data }, { store })} type={type} {...data} />}
        />
      </Fragment>
    );
  }

  render() {
    const {
      _onToggleDialog, _onVault, renderStats,
      props: { visible, ...inherit },
      state: { dialog, stats },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation,
            store: {
              baseCurrency, overall: { stats: { expenses = [], incomes = [] } = {}, ...overall }, vaults, ...store
            },
          }) => (
            <Fragment>
              <ScrollView contentContainerStyle={styles.scroll}>
                <BalanceCard currency={baseCurrency} title={l10n.BALANCE} {...overall} />
                <HeadingItem title={l10n.VAULTS} />
                <Slider
                  {...SLIDER_PROPS}
                  dataSource={vaults}
                  item={({ data: vault }) => (
                    <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />)}
                />

                { incomes.length > 0 && renderStats(incomes, TYPE.INCOME, { l10n, store }) }
                { expenses.length > 0 && renderStats(expenses, TYPE.EXPENSE, { l10n, store }) }
              </ScrollView>
              <FloatingButton onPress={_onToggleDialog} visible={!dialog} />
              { visible && (
                <Fragment>
                  { vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
                  <DialogVault visible={!stats && dialog} onClose={_onToggleDialog} />
                  <DialogStats {...stats} visible={stats && dialog} onClose={_onToggleDialog} />
                </Fragment>
              )}
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Dashboard;

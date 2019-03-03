import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView } from 'react-native';

import { C } from '../../common';
import {
  BalanceCard, DialogStats, DialogVault, FloatingButton, HeadingItem, SliderStats, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import { Slider, Viewport } from '../../reactor/components';
import styles from './Dashboard.style';

const { SCREEN, SLIDER, TX: { TYPE } } = C;

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

  _onStats = (type, data, { query }) => {
    const stats = { type, ...data };

    query({ method: 'groupByCategory', date: (new Date().toISOString()).substr(0, 7), ...stats });
    this.setState({ dialog: true, stats });
  }

  render() {
    const {
      _onStats, _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog, stats },
    } = this;

    console.log('<Dashboard>');

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
                  {...SLIDER}
                  dataSource={vaults}
                  item={({ data: vault }) => (
                    <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />)}
                  style={styles.slider}
                />

                { incomes.length > 0 && (
                  <SliderStats
                    dataSource={incomes}
                    type={TYPE.INCOME}
                    onItem={data => _onStats(TYPE.INCOME, data, store)}
                  />
                )}

                { expenses.length > 0 && (
                  <SliderStats
                    dataSource={expenses}
                    type={TYPE.EXPENSE}
                    onItem={data => _onStats(TYPE.EXPENSE, data, store)}
                  />
                )}
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

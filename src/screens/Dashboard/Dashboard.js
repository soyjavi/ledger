import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { BalanceCard, DialogVault, VaultItem } from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Text, Viewport } from '../../reactor/components';
import styles from './Dashboard.style';

const { iconChart } = ASSETS;
const { SCREEN } = C;
const { COLOR } = THEME;

class Dashboard extends PureComponent {
  static propTypes = {
    navigation: shape({}),
    visible: bool,
  };

  static defaultProps = {
    navigation: undefined,
    visible: true,
  };

  state = {
    dialog: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { state: { dialog } } = this;
      if (dialog) this.setState({ dialog: false });
      return true;
    });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onVault = ({ navigation, store, vault }) => {
    const { props } = this;

    store.query({ vault: vault.hash, method: 'groupByDay', date: new Date().toISOString().substr(0, 7) });
    navigation.navigate(SCREEN.VAULT, vault, props.navigation);
  }

  _onStats = ({ navigation, store: { query } }) => {
    const { props } = this;

    query({ method: 'groupByCategory', date: (new Date().toISOString()).substr(0, 7) });
    navigation.navigate(SCREEN.STATS, undefined, props.navigation);
  }

  render() {
    const {
      _onStats, _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation,
            store: {
              baseCurrency, overall, vaults, ...store
            },
          }) => (
            <Fragment>
              <ScrollView contentContainerStyle={styles.scroll}>
                <BalanceCard
                  chart={overall.chart}
                  currency={baseCurrency}
                  lastWeek={overall.lastWeek}
                  title={l10n.OVERALL_BALANCE}
                  value={overall.currentBalance}
                />

                <Text subtitle level={3} lighten style={styles.subtitle}>$Vaults</Text>
                <View>
                  { vaults.map(vault => (
                    <VaultItem
                      key={vault.hash}
                      {...vault}
                      onPress={() => _onVault({ navigation, store, vault })}
                    />))}
                </View>

                <Text subtitle level={3} lighten style={styles.subtitle}>$January Expenses</Text>
                <Text subtitle level={3} lighten style={styles.subtitle}>$January Incomes</Text>
              </ScrollView>
              <View style={styles.footer}>
                <Button outlined onPress={() => _onStats({ navigation, store })} title={l10n.STATS} />
                <Button
                  color={COLOR.PRIMARY}
                  onPress={_onToggleDialog}
                  shadow
                  style={styles.button}
                  title={`${l10n.NEW} ${l10n.VAULT}`}
                />
              </View>
              { visible && vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
              { visible && <DialogVault visible={dialog} onClose={_onToggleDialog} /> }
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Dashboard;

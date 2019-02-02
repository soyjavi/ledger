import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { C } from '../../common';
import { BalanceCard, DialogVault, VaultItem } from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Button, Price, Text, Viewport,
} from '../../reactor/components';
import styles from './Dashboard.style';

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
                  progression={overall.progression}
                  title={l10n.OVERALL_BALANCE}
                  value={overall.currentBalance}
                />

                <View style={styles.row}>
                  <Text headline level={5} style={styles.subtitle}>{l10n.VAULTS}</Text>
                  <Text caption level={2} lighten>$Current state</Text>
                </View>
                <View style={styles.vaults}>
                  { vaults.map(vault => (
                    <VaultItem
                      key={vault.hash}
                      {...vault}
                      onPress={() => _onVault({ navigation, store, vault })}
                    />))}
                </View>

                <View style={styles.row}>
                  <Text headline level={5} style={styles.subtitle}>{l10n.EXPENSES}</Text>
                  <Price caption color={COLOR.EXPENSES} level={2} lighten symbol={baseCurrency} />
                </View>
                <View style={styles.row}>
                  <Text headline level={5} style={styles.subtitle}>{l10n.INCOMES}</Text>
                  <Price caption color={COLOR.INCOMES} level={2} lighten symbol={baseCurrency} />
                </View>
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

import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { C } from '../../common';
import {
  BalanceCard, Chart, DialogVault, FloatingButton, HeadingItem, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import {
  Slider, Text, Touchable, Viewport,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import styles from './Dashboard.style';

const { SCREEN, SLIDER } = C;
const { COLOR } = THEME;

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

  render() {
    const {
      _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog, stats },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({
              l10n, navigation,
              store: {
                baseCurrency, overall, vaults, ...store
              },
            }) => (
              <Fragment>
                <ScrollView contentContainerStyle={styles.scroll}>
                  <BalanceCard currency={baseCurrency} title={l10n.BALANCE} {...overall} />

                  <HeadingItem title={l10n.MONTHLY} />
                  <Slider {...SLIDER} style={styles.slider}>
                    <Touchable style={styles.card} onPress={() => navigation.navigate(SCREEN.STATS)} rippleColor='red'>
                      <Text caption level={2} numberOfLines={1}>{l10n.BALANCE.toUpperCase()}</Text>
                      <Chart values={overall.chart.balance} />
                    </Touchable>

                    <View style={styles.card}>
                      <Text caption level={2} numberOfLines={1}>{l10n.EXPENSES.toUpperCase()}</Text>
                      <Chart series={overall.chart.week} />
                    </View>
                  </Slider>

                  <HeadingItem title={l10n.VAULTS} />
                  <Slider
                    {...SLIDER}
                    dataSource={vaults}
                    item={({ data: vault }) => (
                      <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />)}
                    style={styles.slider}
                  />
                </ScrollView>
                <FloatingButton onPress={_onToggleDialog} visible={!dialog} />
                { visible && (
                  <Fragment>
                    { vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
                    <DialogVault visible={!stats && dialog} onClose={_onToggleDialog} />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Consumer>
        )}

      </Viewport>
    );
  }
}

export default Dashboard;

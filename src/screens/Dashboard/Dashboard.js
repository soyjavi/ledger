import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { C } from '../../common';
import {
  Footer, Header, Heading, Summary, TransactionItem,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import { DialogVault, VaultItem } from './components';
import { queryEnabledVaults, queryLastTxs } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH } } = C;
const { SPACE } = THEME;

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
    scroll: false,
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

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
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
      _onScroll, _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog, scroll, stats },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({
              l10n, navigation,
              store: {
                baseCurrency, overall, txs, vaults, ...store
              },
            }) => (
              <Fragment>
                <Header
                  highlight={scroll}
                  right={{ title: l10n.SETTINGS, onPress: () => navigation.navigate(SCREEN.SETTINGS) }}
                  title={l10n.OVERALL_BALANCE}
                />

                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.scroll}>
                  <Summary {...overall} currency={baseCurrency} style={styles.summary} title={l10n.OVERALL_BALANCE} />
                  <Heading breakline subtitle={l10n.VAULTS} />
                  <Slider
                    itemWidth={VAULT_ITEM_WIDTH + SPACE.S}
                    itemMargin={0}
                    style={styles.vaults}
                  >
                    { queryEnabledVaults(vaults).map(vault => (
                      <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />
                    ))}
                  </Slider>

                  <Heading breakline subtitle={l10n.LAST_TRANSACTIONS} />
                  <View>
                    { queryLastTxs({ txs, vaults }).map(tx => <TransactionItem key={tx.hash} {...tx} />)}
                  </View>
                </ScrollView>

                <Footer onPress={_onToggleDialog} />
                { visible && (
                  <Fragment>
                    { vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
                    <DialogVault baseCurrency={baseCurrency} visible={!stats && dialog} onClose={_onToggleDialog} />
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

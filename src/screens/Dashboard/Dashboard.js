import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { C } from '../../common';
import {
  Footer, Header, Heading, Summary, TransactionItem,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH }, SETTINGS: { HIDE_OVERALL_BALANCE } } = C;
const { SPACE } = THEME;

class Dashboard extends PureComponent {
  static propTypes = {
    backward: bool,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    visible: true,
  };

  state = {
    dialog: false,
    scroll: false,
  };

  componentWillReceiveProps({ backward }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';

    BackHandler[method]('hardwareBackPress', () => {
      const { state: { dialog } } = this;
      if (dialog) this.setState({ dialog: false });
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
    this.setState({ dialog: !dialog });
  }

  _onVault = ({ navigation, vault }) => {
    navigation.navigate(SCREEN.VAULT, vault);
  }

  render() {
    const {
      _onScroll, _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog, scroll },
    } = this;

    console.log('<Dashboard>', { visible, dialog, scroll });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({
              l10n, navigation,
              store: {
                baseCurrency, overall, settings, txs, vaults,
              },
            }) => (
              <Fragment>
                <Header
                  highlight={scroll}
                  right={{ title: l10n.SETTINGS, onPress: () => navigation.navigate(SCREEN.SETTINGS) }}
                  title={l10n.OVERALL_BALANCE}
                />
                <Syncing scroll={scroll} />
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.scroll}>
                  <Summary
                    {...overall}
                    currency={baseCurrency}
                    mask={settings[HIDE_OVERALL_BALANCE]}
                    title={l10n.OVERALL_BALANCE}
                  />

                  <Heading title={l10n.VAULTS} />
                  <Slider
                    itemWidth={VAULT_ITEM_WIDTH + SPACE.S}
                    itemMargin={0}
                    steps={1}
                    style={styles.vaults}
                  >
                    { queryVaults({ settings, vaults }).map(vault => (
                      <VaultCard key={vault.hash} {...vault} onPress={() => _onVault({ navigation, vault })} />
                    ))}
                  </Slider>

                  { queryLastTxs({ txs, vaults }).length > 0 && (
                    <Fragment>
                      <Heading breakline subtitle={l10n.LAST_TRANSACTIONS} />
                      <View>
                        { queryLastTxs({ txs, vaults }).map(tx => (
                          <TransactionItem key={tx.hash} showDate {...tx} />
                        ))}
                      </View>
                    </Fragment>
                  )}
                </ScrollView>

                <Footer onPress={_onToggleDialog} />
                { visible && (
                  <Fragment>
                    { vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
                    <DialogVault baseCurrency={baseCurrency} visible={dialog} onClose={_onToggleDialog} />
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

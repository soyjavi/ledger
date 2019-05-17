import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { C, onHardwareBackPress } from '../../common';
import {
  Footer, Header, Heading, Summary, TransactionItem,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH }, SETTINGS: { NIGHT_MODE } } = C;
const { SPACE } = THEME;

class Dashboard extends PureComponent {
  static propTypes = {
    backward: bool,
    mask: bool,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    mask: false,
    visible: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      mask: props.mask,
      scroll: false,
    };
  }

  componentWillReceiveProps({ backward, mask }) {
    const { props } = this;

    if (mask !== props.mask) this.setState({ mask });

    onHardwareBackPress(!backward, () => {
      const { state: { dialog } } = this;
      if (dialog) this.setState({ dialog: false });
    });
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > SPACE.MEDIUM;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onSwitchMask = mask => this.setState({ mask });

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onVault = ({ navigation, vault }) => {
    navigation.navigate(SCREEN.VAULT, vault);
  }

  render() {
    const {
      _onScroll, _onSwitchMask, _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog, mask, scroll },
    } = this;

    console.log('<Dashboard>', { visible, dialog, scroll });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({
              events: { isConnected },
              l10n,
              navigation,
              store: {
                baseCurrency, overall, settings, sync, txs, vaults,
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
                    onMask={_onSwitchMask}
                    mask={mask}
                    title={l10n.OVERALL_BALANCE}
                  />

                  <Heading title={l10n.VAULTS} />
                  <Slider itemWidth={VAULT_ITEM_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
                    { queryVaults({ settings, vaults }).map(vault => (
                      <VaultCard
                        {...vault}
                        key={vault.hash}
                        mask={mask}
                        onPress={() => _onVault({ navigation, vault })}
                      />
                    ))}
                  </Slider>

                  { queryLastTxs({ txs, vaults }).length > 0 && (
                    <Fragment>
                      <Heading breakline title={l10n.LAST_TRANSACTIONS} />
                      <View>
                        { queryLastTxs({ txs, vaults }).map(tx => (
                          <TransactionItem key={tx.hash} showDate {...tx} />
                        ))}
                      </View>
                    </Fragment>
                  )}
                </ScrollView>

                <Footer onPress={_onToggleDialog} />

                { visible && isConnected && sync && (
                  <Fragment>
                    { vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
                    <DialogVault
                      baseCurrency={baseCurrency}
                      highlight={settings[NIGHT_MODE]}
                      visible={dialog}
                      onClose={_onToggleDialog}
                    />
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

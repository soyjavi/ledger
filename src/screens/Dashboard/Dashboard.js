import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import { C } from '../../common';
import {
  BalanceCard, DialogVault, FloatingButton, Header, Heading, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import { Slider, Viewport } from '../../reactor/components';
import styles from './Dashboard.style';

const { SCREEN } = C;

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
                baseCurrency, overall, vaults, ...store
              },
            }) => (
              <Fragment>
                <Header highlight={scroll} title={l10n.OVERALL_BALANCE} />
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.scroll}>
                  <BalanceCard currency={baseCurrency} title={l10n.OVERALL_BALANCE} {...overall} />
                  <Heading breakline title={l10n.VAULTS} />
                  <Slider style={styles.vaults}>
                    { vaults.map(vault => (
                      <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />
                    ))}
                  </Slider>

                  <Heading breakline title="$Last Transactions" />

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

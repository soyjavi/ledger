import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { THEME } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import { C, onHardwareBackPress } from '../../common';
import {
  ButtonMore, Footer, GroupTransactions, Header, Heading, Summary,
} from '../../components';
import { Consumer } from '../../context';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH } } = C;
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

  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      scroll: false,
    };
  }

  componentWillReceiveProps({ backward }) {
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
              events: { connected },
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
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.scroll}>
                  <Summary
                    {...overall}
                    currency={baseCurrency}
                    title={l10n.OVERALL_BALANCE}
                  />

                  <Heading subtitle={l10n.VAULTS}>
                    <ButtonMore title={l10n.MORE} onPress={() => navigation.navigate(SCREEN.VAULTS)} />
                  </Heading>
                  <Slider itemWidth={VAULT_ITEM_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
                    { queryVaults({ settings, vaults }).map((vault) => (
                      <VaultCard
                        {...vault}
                        key={vault.hash}
                        onPress={() => _onVault({ navigation, vault })}
                      />
                    ))}
                  </Slider>

                  <Heading subtitle={l10n.LAST_TRANSACTIONS} />
                  { queryLastTxs({ txs, vaults }).map((item) => (
                    <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />))}
                </ScrollView>

                <Syncing scroll={scroll} />

                <Footer onPress={_onToggleDialog} />

                { visible && connected && sync && (
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

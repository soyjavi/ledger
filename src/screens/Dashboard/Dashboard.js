import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView } from 'react-native';

import { C } from '../../common';
import {
  BalanceCard, DialogVault, FloatingButton, HeadingItem, StatItem, VaultItem,
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
      _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog },
    } = this;
    const currentMonth = (new Date()).getMonth();

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation,
            store: {
              baseCurrency, overall: { stats: { expenses, incomes } = {}, ...overall }, vaults, ...store
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

                { incomes && incomes.length > 0 && (
                  <Fragment>
                    <HeadingItem title={`${l10n.MONTHS[currentMonth]}'s ${l10n.INCOMES}`} />
                    <Slider
                      {...SLIDER_PROPS}
                      dataSource={incomes}
                      item={({ data }) => <StatItem type={TYPE.INCOME} {...data} />}
                    />
                  </Fragment>)}
                { expenses && expenses.length > 0 && (
                  <Fragment>
                    <HeadingItem title={`${l10n.MONTHS[currentMonth]}'s ${l10n.EXPENSES}`} />
                    <Slider
                      {...SLIDER_PROPS}
                      dataSource={expenses}
                      item={({ data }) => <StatItem type={TYPE.EXPENSE} {...data} />}
                    />
                  </Fragment>)}
              </ScrollView>
              <FloatingButton onPress={_onToggleDialog} visible={!dialog} />
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

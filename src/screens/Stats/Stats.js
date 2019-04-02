import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import {
  BalanceCard, DialogStats, Header, HeadingItem, SliderStats, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import { ENV } from '../../reactor/common';
import { Slider, Viewport } from '../../reactor/components';
import styles from './Stats.style';

const { iconBack } = ASSETS;
const { SCREEN, SLIDER, TX: { TYPE } } = C;
const { IS_WEB } = ENV;

class Stats extends PureComponent {
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

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({
              l10n, navigation,
              store: {
                baseCurrency, overall: { stats: { expenses = [], incomes = [] } = {}, ...overall }, vaults, ...store
              },
            }) => (
              <Fragment>
                <Header
                  left={IS_WEB ? { icon: iconBack, onPress: () => navigation.goBack() } : undefined}
                  visible={visible}
                />
                <ScrollView contentContainerStyle={styles.scroll}>
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
                <DialogStats {...stats} visible={stats && dialog} onClose={_onToggleDialog} />
              </Fragment>
            )}
          </Consumer>
        )}

      </Viewport>
    );
  }
}

export default Stats;

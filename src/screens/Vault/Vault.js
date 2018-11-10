import { bool, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import { Chart, TransactionItem } from 'components';
import { Header } from 'containers';
import { Consumer } from 'context';
import {
  Price, Text, Viewport,
} from 'reactor/components';
import { groupByDay } from './modules';
import styles from './Vault.style';

class Vault extends Component {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: undefined,
    visible: false,
  };

  state = {
    busy: false,
    date: '2018-11',
  };

  // shouldComponentUpdate() {
  //   const { props: { ...inherit } } = this;

  //   return !inherit.backward;
  // }

  render() {
    const {
      props: { dataSource, visible, ...inherit },
      state: { busy, date },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            navigation: {
              goBack,
              parameters: {
                color, hash: vault, title, balance, currency,
              } = {},
            },
            l10n,
            store,
          }) => (
            <Fragment>
              <Header
                busy={busy}
                left={{ title: l10n.BACK, onPress: () => goBack() }}
                title={title}
                right={{ title: l10n.SEARCH }}
                visible
              />
              <ScrollView style={styles.scroll}>
                <View style={styles.summary}>
                  <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
                  <Price level={5} value={balance} symbol={currency} />
                  <View style={styles.row}>
                    <View style={[styles.cashflow, styles.row]}>
                      <Text style={styles.bullet}>
                        ▲
                      </Text>
                      <Price caption="+" headline={false} subtitle level={3} lighten value={123} />
                      <Text style={[styles.bullet, styles.marginRight]}>
                        ▲
                      </Text>
                      <Price headline={false} subtitle level={3} lighten value={12223} />
                    </View>
                    <Chart color={color} />
                  </View>
                </View>
                { groupByDay(store, vault, date).map(tx => <TransactionItem key={tx.hash} {...tx} />)}
              </ScrollView>
            </Fragment>
          )}
        </Consumer>

      </Viewport>
    );
  }
}

export default Vault;

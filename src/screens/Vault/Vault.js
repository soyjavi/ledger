import { bool, func, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { C, cashflow } from 'common';
import { Chart, DialogTransaction, TransactionItem } from 'components';
import { Header } from 'containers';
import { Consumer } from 'context';
import {
  Price, Text, Viewport,
} from 'reactor/components';
import { chartCashflow, groupByDay } from './modules';
import styles from './Vault.style';

const { TX: { TYPE: { INCOME, EXPENSE } } } = C;

class Vault extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
    dialog: bool,
    onDialog: func,
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    dialog: false,
    onDialog() {},
    visible: false,
  };

  state = {
    cashflow: {},
    date: '2018-11',
    txs: [],
  };

  componentWillReceiveProps({ visible, dataSource }) {
    const { _onDate, props, state } = this;

    if (visible && props.visible === false) _onDate(state.date, dataSource);
  }

  _onDate = (date = this.state.date, dataSource = this.props.dataSource) => {
    const txs = groupByDay(dataSource.txs, dataSource.hash, date);
    this.setState({
      cashflow: cashflow(txs),
      chart: chartCashflow(txs),
      date,
      txs,
    });
  }

  render() {
    const {
      props: {
        dataSource: {
          balance, cashflow: { income, expenses } = {}, color, currency, hash, title,
        },
        dialog,
        onDialog,
        visible,
        ...inherit
      },
      state,
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { }
        <Consumer>
          { ({ navigation, l10n }) => (
            <Fragment>
              <Header
                left={{ title: l10n.BACK, onPress: () => navigation.goBack() }}
                title={title}
                right={{ title: l10n.SEARCH }}
                visible={visible}
              />
              <ScrollView style={styles.scroll}>
                <View style={styles.summary}>
                  <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
                  <Price level={5} value={balance + income - expenses} symbol={currency} />
                  <View style={styles.row}>
                    <View style={[styles.cashflow, styles.row]}>
                      <Text style={styles.bullet}>
                        ▲
                      </Text>
                      <Price caption="+" headline={false} subtitle level={3} lighten value={state.cashflow.income} />
                      <Text style={[styles.bullet, styles.marginRight]}>
                        ▲
                      </Text>
                      <Price headline={false} subtitle level={3} lighten value={state.cashflow.expenses} />
                    </View>
                    <Chart color={color} values={state.chart} />
                  </View>
                </View>
                { state.txs.map(tx => <TransactionItem key={tx.hash || tx.timestamp} {...tx} />)}
              </ScrollView>

              { visible && <DialogTransaction type={EXPENSE} vault={hash} onClose={onDialog} visible={dialog} /> }
            </Fragment>
          )}
        </Consumer>

      </Viewport>
    );
  }
}

export default Vault;

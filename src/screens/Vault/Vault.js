import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { C, cashflow } from 'common';
import {
  Chart, DialogTransaction, FloatingButton, TransactionItem,
} from 'components';
import { Header } from 'containers';
import { Consumer } from 'context';
import {
  Price, Text, Viewport,
} from 'reactor/components';
import { chartCashflow, groupByDay } from './modules';
import styles from './Vault.style';

const { TX: { TYPE: { EXPENSE } } } = C;

class Vault extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    visible: false,
  };

  state = {
    cashflow: {},
    date: '2018-11',
    dialog: false,
    type: EXPENSE,
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

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onType = type => this.setState({ dialog: type !== undefined, type });

  render() {
    const {
      _onToggleDialog, _onType,
      props: {
        dataSource: {
          balance, cashflow: { income, expenses } = {}, color, currency, hash, title,
        },
        visible,
        ...inherit
      },
      state: { dialog, type, ...state },
    } = this;

    const cashflowProps = {
      headline: false, subtitle: true, level: 3, lighten: true, symbol: currency,
    };

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
                      <Price caption="+" {...cashflowProps} value={state.cashflow.income} />
                      <Text style={[styles.bullet, styles.marginRight]}>
                        ▲
                      </Text>
                      <Price {...cashflowProps} value={state.cashflow.expenses} />
                    </View>
                    <Chart color={color} values={state.chart} />
                  </View>
                </View>
                { state.txs.map(tx => <TransactionItem key={tx.hash || tx.timestamp} {...tx} />)}
              </ScrollView>

              <FloatingButton
                onPress={dialog ? _onToggleDialog : _onType}
                options={l10n.TYPE_TRANSACTION}
                visible={!dialog && !inherit.backward}
              />
              { visible && <DialogTransaction type={type} vault={hash} onClose={_onToggleDialog} visible={dialog} /> }
            </Fragment>
          )}
        </Consumer>

      </Viewport>
    );
  }
}

export default Vault;

import {
  arrayOf, func, number, shape, string,
} from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange, verboseDate } from '../../common';
import { Consumer } from '../../context';
import { Icon, Price } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import Heading from '../Heading';
import TransactionItem from '../TransactionItem';
import styles from './GroupTransactions.style';

const { iconExpense, iconIncome } = ASSETS;
const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

class GroupTransactions extends Component {
  static propTypes = {
    currency: string,
    onItem: func,
    timestamp: string.isRequired,
    txs: arrayOf(shape()).isRequired,
    value: number,
  };

  static defaultProps = {
    currency: undefined,
    onItem: undefined,
    value: 0,
  };

  shouldComponentUpdate(nextProps) {
    const { props: { timestamp, value } } = this;
    return timestamp !== nextProps.timestamp && value !== nextProps.value;
  }

  render() {
    const {
      props: {
        currency, onItem, timestamp, txs = [], value,
      },
    } = this;

    return (
      <Consumer>
        { ({ store: { baseCurrency, rates }, l10n }) => (
          <View>
            <Heading breakline subtitle={verboseDate(timestamp, l10n)}>
              <View style={styles.heading}>
                <Icon value={value > 0 ? iconIncome : iconExpense} style={styles.icon} />
                <Price
                  color={value > 0 ? COLOR.INCOMES : COLOR.EXPENSES}
                  subtitle
                  level={3}
                  fixed={FIXED[baseCurrency]}
                  symbol={SYMBOL[baseCurrency]}
                  value={baseCurrency !== currency
                    ? exchange(Math.abs(value), currency, baseCurrency, rates)
                    : Math.abs(value)}
                />
              </View>
            </Heading>
            { txs.map(tx => (
              <TransactionItem key={tx.hash} {...tx} currency={currency} onPress={() => onItem(tx)} />
            ))}
          </View>
        )}
      </Consumer>
    );
  }
}

export default GroupTransactions;

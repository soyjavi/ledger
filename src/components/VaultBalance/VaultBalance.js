import React from 'react';
import { View } from 'react-native';

import { C, cashflow, exchange } from '../../common';
import { Consumer } from '../../context';
import { Price, Text } from '../../reactor/components';
import BulletBalance from '../BulletBalance';
import Chart from '../Chart';
import { chartCashflow } from './modules';
import styles from './VaultBalance.style';

const { FIXED, SYMBOL } = C;

export default ({ dataSource = {}, baseCurrency, txs }) => {
  const {
    balance, cashflow: { income, expenses } = {}, color, currency,
  } = dataSource;

  const activeCurrency = baseCurrency || currency;

  const priceProps = {
    fixed: FIXED[activeCurrency], symbol: SYMBOL[activeCurrency],
  };
  const vaultBalance = balance + income - expenses;
  const { income: monthIncome, expenses: monthExpenses } = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={styles.container}>
          <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
          <Price
            {...priceProps}
            headline
            level={5}
            value={baseCurrency ? exchange(vaultBalance, currency, baseCurrency, rates) : vaultBalance}
          />
          <View style={styles.row}>
            <View style={[styles.cashflow, styles.row]}>
              <BulletBalance
                income
                {...priceProps}
                value={baseCurrency ? exchange(monthIncome, currency, baseCurrency, rates) : monthIncome}
              />
              <BulletBalance
                {...priceProps}
                value={baseCurrency ? exchange(monthExpenses, currency, baseCurrency, rates) : monthExpenses}
              />
            </View>
            <Chart color={color} values={chartCashflow(txs)} />
          </View>
        </View>
      )}
    </Consumer>
  );
};

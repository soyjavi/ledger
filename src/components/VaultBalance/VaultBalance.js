import React from 'react';
import { View } from 'react-native';

import { iconTrendingDown, iconTrendingUp } from '../../assets';
import { C, cashflow, exchange } from '../../common';
import { Consumer } from '../../context';
import { Icon, Price, Text } from '../../reactor/components';
import Chart from '../Chart';
import { chartCashflow } from './modules';
import styles from './VaultBalance.style';

const { SYMBOL } = C;

export default ({ dataSource = {}, baseCurrency, txs }) => {
  const {
    balance, cashflow: { income, expenses } = {}, color, currency,
  } = dataSource;
  const priceProps = {
    headline: false, subtitle: true, level: 3, lighten: true, symbol: SYMBOL[baseCurrency || currency],
  };
  const vaultBalance = balance + income - expenses;
  const { income: monthIncome, expenses: monthExpenses } = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={styles.container}>
          <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
          <Price
            level={5}
            value={baseCurrency ? exchange(vaultBalance, currency, baseCurrency, rates) : vaultBalance}
            symbol={SYMBOL[baseCurrency || currency]}
          />
          <View style={styles.row}>
            <View style={[styles.cashflow, styles.row]}>
              <View style={styles.bullet}>
                <Icon value={iconTrendingUp} style={styles.icon} />
              </View>
              <Price
                caption="+"
                {...priceProps}
                value={baseCurrency ? exchange(monthIncome, currency, baseCurrency, rates) : monthIncome}
              />
              <View style={[styles.bullet, styles.bulletExpenses]}>
                <Icon value={iconTrendingDown} style={styles.icon} />
              </View>
              <Price
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

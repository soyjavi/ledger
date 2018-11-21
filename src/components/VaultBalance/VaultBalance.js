import React from 'react';
import { View } from 'react-native';

import { iconTrendingDown, iconTrendingUp } from '../../assets';
import { C, cashflow, exchange } from '../../common';
import { Consumer } from '../../context';
import { Icon, Price, Text } from '../../reactor/components';
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
              <View style={styles.bullet}>
                <Icon value={iconTrendingUp} style={styles.icon} />
              </View>
              <Price
                {...priceProps}
                lighten
                subtitle
                level={3}
                title="+"
                value={baseCurrency ? exchange(monthIncome, currency, baseCurrency, rates) : monthIncome}
              />
              <View style={[styles.bullet, styles.bulletExpenses]}>
                <Icon value={iconTrendingDown} style={styles.icon} />
              </View>
              <Price
                {...priceProps}
                lighten
                subtitle
                level={3}
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

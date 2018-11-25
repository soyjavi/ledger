import React from 'react';
import { View } from 'react-native';

import { C, cashflow, exchange } from '../../common';
import { Consumer } from '../../context';
import { Price, Text } from '../../reactor/components';
import BulletPrice from '../BulletPrice';
import Chart from '../Chart';
import { chartCashflow } from './modules';
import styles from './VaultBalance.style';

const { FIXED, SYMBOL } = C;

export default ({ dataSource = {}, baseCurrency, txs }) => {
  const { color, currency, overallBalance } = dataSource;

  const activeCurrency = baseCurrency || currency;

  const priceProps = {
    fixed: FIXED[activeCurrency], symbol: SYMBOL[activeCurrency],
  };
  const { incomes: monthIncomes, expenses: monthExpenses } = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={styles.container}>
          <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
          <Price
            {...priceProps}
            headline
            level={5}
            value={baseCurrency ? exchange(overallBalance, currency, baseCurrency, rates) : overallBalance}
          />
          <View style={styles.row}>
            <View style={[styles.cashflow, styles.row]}>
              <BulletPrice
                income
                {...priceProps}
                value={baseCurrency ? exchange(monthIncomes, currency, baseCurrency, rates) : monthIncomes}
              />
              <BulletPrice
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

import { arrayOf, shape, string } from 'prop-types';
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

const VaultBalance = ({ dataSource = {}, baseCurrency, txs }) => {
  const { color, currency, overallBalance } = dataSource;
  const activeCurrency = baseCurrency || currency;
  const { incomes: monthIncomes, expenses: monthExpenses } = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={styles.container}>
          <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
          <Price
            fixed={FIXED[activeCurrency]}
            headline
            level={6}
            symbol={SYMBOL[activeCurrency]}
            value={baseCurrency ? exchange(overallBalance, currency, baseCurrency, rates) : overallBalance}
          />
          <View style={[styles.row, styles.content]}>
            <View style={[styles.cashflow, styles.row]}>
              <BulletPrice
                currency={activeCurrency}
                incomes
                value={baseCurrency ? exchange(monthIncomes, currency, baseCurrency, rates) : monthIncomes}
                style={styles.bulletPrice}
              />
              <BulletPrice
                currency={activeCurrency}
                value={baseCurrency ? exchange(monthExpenses, currency, baseCurrency, rates) : monthExpenses}
                style={styles.bulletPrice}
              />
            </View>
            <Chart color={color} values={chartCashflow(txs)} />
          </View>
        </View>
      )}
    </Consumer>
  );
};

VaultBalance.propTypes = {
  baseCurrency: string,
  dataSource: shape({}),
  txs: arrayOf(shape({})),
};

VaultBalance.defaultProps = {
  baseCurrency: undefined,
  dataSource: undefined,
  txs: undefined,
};

export default VaultBalance;

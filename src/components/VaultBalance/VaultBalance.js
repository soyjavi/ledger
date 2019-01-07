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
  const {
    color, currency, overallBalance, title,
  } = dataSource;
  const activeCurrency = baseCurrency || currency;
  const { incomes: monthIncomes, expenses: monthExpenses } = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={styles.container}>
          <View style={[styles.row, styles.content]}>
            <View style={styles.info}>
              <Text lighten subtitle level={2}>{`${title} ${l10n.BALANCE}`}</Text>
              <Price
                fixed={FIXED[activeCurrency]}
                headline
                level={4}
                symbol={SYMBOL[activeCurrency]}
                value={baseCurrency ? exchange(overallBalance, currency, baseCurrency, rates) : overallBalance}
              />
              <View style={[styles.row, styles.cashflow]}>
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

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

const VaultBalance = ({
  dataSource = {}, baseCurrency, txs,
}) => {
  const {
    color, currency, currentBalance, title,
  } = dataSource;
  const activeCurrency = baseCurrency || currency;
  const { incomes: monthIncomes, expenses: monthExpenses } = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={[styles.row, styles.container]}>
          <View style={styles.info}>
            <Text lighten subtitle>{title}</Text>
            <Price
              fixed={FIXED[activeCurrency]}
              headline
              level={4}
              symbol={SYMBOL[activeCurrency]}
              value={baseCurrency ? exchange(currentBalance, currency, baseCurrency, rates) : currentBalance}
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
          <Chart color={color} title={l10n.LAST_30_DAYS} values={chartCashflow(txs)} />
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

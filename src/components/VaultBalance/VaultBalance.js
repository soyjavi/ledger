import React from 'react';
import { View } from 'react-native';

import { cashflow } from 'common';
import { Chart } from 'components';
import { Consumer } from 'context';
import { Price, Text } from 'reactor/components';
import { chartCashflow } from './modules';
import styles from './VaultBalance.style';

export default ({ dataSource = {}, txs }) => {
  const {
    balance, cashflow: { income, expenses } = {}, color, currency,
  } = dataSource;
  const priceProps = {
    headline: false, subtitle: true, level: 3, lighten: true, symbol: currency,
  };
  const vaultCashflow = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n }) => (
        <View style={styles.container}>
          <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
          <Price level={5} value={balance + income - expenses} symbol={currency} />
          <View style={styles.row}>
            <View style={[styles.cashflow, styles.row]}>
              <Text style={styles.bullet}>
                ▲
              </Text>
              <Price caption="+" {...priceProps} value={vaultCashflow.income} />
              <Text style={[styles.bullet, styles.marginRight]}>
                ▲
              </Text>
              <Price {...priceProps} value={vaultCashflow.expenses} />
            </View>
            <Chart color={color} values={chartCashflow(txs)} />
          </View>
        </View>
      )}
    </Consumer>
  );
};

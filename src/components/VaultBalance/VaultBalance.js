import React from 'react';
import { View } from 'react-native';

import { C, cashflow } from '../../common';
import { Consumer } from '../../context';
import { Price, Text } from '../../reactor/components';
import Chart from '../Chart';
import { chartCashflow } from './modules';
import styles from './VaultBalance.style';

const { SYMBOL } = C;

export default ({ dataSource = {}, txs }) => {
  const {
    balance, cashflow: { income, expenses } = {}, color, currency,
  } = dataSource;
  const priceProps = {
    headline: false, subtitle: true, level: 3, lighten: true, symbol: SYMBOL[currency],
  };
  const vaultCashflow = cashflow(txs);

  return (
    <Consumer>
      { ({ l10n }) => (
        <View style={styles.container}>
          <Text lighten subtitle level={3}>{l10n.OVERALL_BALANCE}</Text>
          <Price level={5} value={balance + income - expenses} symbol={SYMBOL[currency]} />
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

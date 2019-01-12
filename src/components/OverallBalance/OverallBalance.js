import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { Price, Text } from '../../reactor/components';
import BulletPrice from '../BulletPrice';
import Chart from '../Chart';
import styles from './OverallBalance.style';

const { FIXED, SYMBOL } = C;

export default () => (
  <Consumer>
    { ({
      l10n,
      store: {
        baseCurrency,
        overall: {
          balance, chart, currentBalance, expenses, incomes,
        } = {},
      },
    }) => (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.info}>
            <Text lighten subtitle>{l10n.OVERALL_BALANCE}</Text>
            <Price headline level={4} fixed={FIXED[baseCurrency]} value={currentBalance} symbol={SYMBOL[baseCurrency]} />
            <Text subtitle level={3} lighten style={styles.month}>
              {`${l10n.MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`}
            </Text>
            <View style={styles.row}>
              <BulletPrice currency={baseCurrency} incomes value={incomes} style={styles.bulletPrice} />
              <BulletPrice currency={baseCurrency} value={expenses} style={styles.bulletPrice} />
            </View>
          </View>
          <Chart inheritValue={balance} title={l10n.LAST_12_MONTHS} values={chart || []} />
        </View>
      </View>
    )}
  </Consumer>
);

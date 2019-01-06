import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Price, Text } from '../../reactor/components';
import BulletPrice from '../BulletPrice';
import styles from './OverallBalance.style';

const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

export default () => (
  <Consumer>
    { ({ l10n, store: { baseCurrency, overall = {} } }) => (
      <View style={styles.container}>
        <Text lighten subtitle level={2}>{l10n.OVERALL_BALANCE}</Text>
        <Price headline level={4} fixed={FIXED[baseCurrency]} value={overall.total} symbol={SYMBOL[baseCurrency]} />
        <Text subtitle level={3} lighten style={styles.month}>
          {l10n.MONTHS[new Date().getMonth()]}
        </Text>
        <View style={styles.row}>
          <BulletPrice
            color={COLOR.TEXT}
            currency={baseCurrency}
            incomes
            value={overall.incomes}
            style={styles.bulletPrice}
          />
          <BulletPrice
            color={COLOR.TEXT}
            currency={baseCurrency}
            incomes
            value={overall.expenses}
            style={styles.bulletPrice}
          />
        </View>
      </View>
    )}
  </Consumer>
);

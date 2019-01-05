import React from 'react';
import { View } from 'react-native';

import { iconExpenses, iconIncomes } from '../../assets';
import { C } from '../../common';
import { Consumer } from '../../context';
import { Icon, Price, Text } from '../../reactor/components';
import styles from './OverallBalance.style';

const { FIXED, SYMBOL } = C;

export default () => (
  <Consumer>
    { ({ l10n, store: { baseCurrency, overall = {} } }) => (
      <View style={styles.container}>
        <Text lighten subtitle level={2}>{l10n.OVERALL_BALANCE}</Text>
        <Price headline level={4} fixed={FIXED[baseCurrency]} value={overall.total} symbol={SYMBOL[baseCurrency]} />
        <View style={styles.content}>
          <View style={styles.context}>
            <View style={styles.image}>
              <Icon value={iconIncomes} />
            </View>
            <View>
              <Text caption lighten>{l10n.INCOMES}</Text>
              <Price
                headline
                level={6}
                title="+"
                fixed={FIXED[baseCurrency]}
                value={overall.incomes}
                symbol={SYMBOL[baseCurrency]}
              />
            </View>
          </View>
          <View style={styles.context}>
            <View style={styles.image}>
              <Icon value={iconExpenses} />
            </View>
            <View>
              <Text caption lighten>{l10n.EXPENSES}</Text>
              <Price
                headline
                level={6}
                fixed={FIXED[baseCurrency]}
                value={overall.expenses}
                symbol={SYMBOL[baseCurrency]}
              />
            </View>
          </View>
        </View>
      </View>
    )}
  </Consumer>
);

import React from 'react';
import { View } from 'react-native';

import { iconTrendingDown, iconTrendingUp } from '../../assets';
import { C } from '../../common';
import { Consumer } from '../../context';
import { Icon, Price, Text } from '../../reactor/components';
import styles from './OverallBalance.style';

const { SYMBOL } = C;

export default () => (
  <Consumer>
    { ({ l10n, store: { baseCurrency, overall = {} } }) => (
      <View style={styles.container}>
        <Text lighten subtitle level={2} style={styles.title}>{l10n.OVERALL_BALANCE}</Text>
        <Price fixed={2} value={overall.total} symbol={SYMBOL[baseCurrency]} level={4} />
        <View style={styles.content}>
          <View style={styles.context}>
            <View style={styles.image}>
              <Icon value={iconTrendingUp} />
            </View>
            <View>
              <Text caption lighten>{l10n.INCOMES}</Text>
              <Price caption="+" value={overall.income} symbol={SYMBOL[baseCurrency]} />
            </View>
          </View>
          <View style={styles.context}>
            <View style={styles.image}>
              <Icon value={iconTrendingDown} />
            </View>
            <View>
              <Text caption lighten>{l10n.EXPENSES}</Text>
              <Price value={overall.expenses} symbol={SYMBOL[baseCurrency]} />
            </View>
          </View>
        </View>
      </View>
    )}
  </Consumer>
);

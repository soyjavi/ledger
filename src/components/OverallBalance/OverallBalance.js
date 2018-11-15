import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { Price, Text } from '../../reactor/components';
import styles from './OverallBalance.style';

const { SYMBOL } = C;

export default () => (
  <Consumer>
    { ({ l10n, store: { currency, overall = {} } }) => (
      <View style={styles.container}>
        <Text lighten subtitle level={2} style={styles.title}>{l10n.OVERALL_BALANCE}</Text>
        <Price fixed={2} value={overall.total} symbol={SYMBOL[currency]} level={4} />
        <View style={styles.content}>
          <View style={styles.context}>
            <View style={styles.image}>
              <Text style={[styles.arrow, styles.arrowIncomes]}>▲</Text>
            </View>
            <View>
              <Text level={2} lighten>{l10n.INCOMES}</Text>
              <Price caption="+" value={overall.income} symbol={SYMBOL[currency]} />
            </View>
          </View>
          <View style={styles.context}>
            <View style={styles.image}>
              <Text style={styles.arrow}>▲</Text>
            </View>
            <View>
              <Text level={2} lighten>{l10n.EXPENSES}</Text>
              <Price value={overall.expenses} symbol={SYMBOL[currency]} />
            </View>
          </View>
        </View>
      </View>
    )}
  </Consumer>
);

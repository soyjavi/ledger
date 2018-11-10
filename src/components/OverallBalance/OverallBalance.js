import React from 'react';
import { View } from 'react-native';

import { Consumer } from 'context';
import { Price, Text } from 'reactor/components';
import styles from './OverallBalance.style';

export default () => (
  <Consumer>
    { ({ l10n }) => (
      <View style={styles.container}>
        <Text lighten subtitle level={2} style={styles.title}>{l10n.OVERALL_BALANCE}</Text>
        <Price value={120392} symbol="$" level={4} />
        <View style={styles.content}>
          <View style={styles.context}>
            <View style={styles.image}>
              <Text style={[styles.arrow, styles.arrowIncomes]}>▲</Text>
            </View>
            <View>
              <Text level={2} lighten>{l10n.INCOMES}</Text>
              <Price caption="+" value={4302.05} symbol="$" />
            </View>
          </View>
          <View style={styles.context}>
            <View style={styles.image}>
              <Text style={styles.arrow}>▲</Text>
            </View>
            <View>
              <Text level={2} lighten>{l10n.EXPENSES}</Text>
              <Price value={498.45} symbol="$" />
            </View>
          </View>
        </View>
      </View>
    )}
  </Consumer>
);

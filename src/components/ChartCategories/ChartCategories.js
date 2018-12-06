import { number, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Price, Text } from '../../reactor/components';
import styles from './ChartCategories.style';

const { FIXED, SYMBOL } = C;

const Chart = ({
  category, color, currency, l10n, value, total,
}) => (
  <View style={styles.content}>
    <View style={styles.row}>
      <Text subtitle level={3} lighten numberOfLines={1} style={styles.text}>{l10n[category]}</Text>
      <Price
        subtitle
        level={3}
        lighten
        fixed={FIXED[currency]}
        style={styles.text}
        symbol={SYMBOL[currency]}
        value={value}
      />
    </View>
    <View style={styles.chart}>
      <View
        style={[
          styles.chart,
          styles.bar,
          { backgroundColor: color, width: `${parseInt((value * 100) / total, 10)}%` },
        ]}
      />
    </View>
  </View>
);

Chart.propTypes = {
  category: string.isRequired,
  color: string.isRequired,
  currency: string.isRequired,
  l10n: shape({}).isRequired,
  total: number.isRequired,
  value: number.isRequired,
};

export default Chart;

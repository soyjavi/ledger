import {
  arrayOf, number, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Price, Text } from '../../reactor/components';
import styles from './ChartCategories.style';

const { FIXED, SYMBOL } = C;

const Chart = ({
  category, color, currency, l10n, value, total, ...inherit
}) => (
  <View style={styles.content}>
    <View style={styles.row}>
      <Text level={2} lighten numberOfLines={1} style={styles.text}>{l10n[category]}</Text>
      <Price {...inherit} subtitle level={3} lighten fixed={FIXED[currency]} symbol={SYMBOL[currency]} value={value} />
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

const ChartCategories = ({
  categories, color, currency, total, values,
}) => (
  <View style={styles.container}>
    <View>
      { Object.keys(values).map(key => (
        <Chart
          key={key}
          color={color}
          currency={currency}
          category={key}
          l10n={categories}
          total={total}
          value={values[key]}
        />))}
    </View>
  </View>
);

ChartCategories.propTypes = {
  categories: arrayOf(string).isRequired,
  color: string.isRequired,
  currency: string.isRequired,
  total: number.isRequired,
  values: shape({}).isRequired,
};

ChartCategories.defaultProps = {
};

export default ChartCategories;

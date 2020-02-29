import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Row, Text } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { PriceFriendly } from '../PriceFriendly';
import styles from './HorizontalChartItem.style';

const { COLOR } = THEME;

export const HorizontalChartItem = ({ color = COLOR.TEXT, currency, small, title, value, width = 100, ...inherit }) => (
  <View style={inherit.style}>
    <Row align="end">
      <Text bold={!small} caption style={styles.text}>
        {title}
      </Text>
      <PriceFriendly caption currency={currency} value={value} />
    </Row>

    <View style={[styles.bar, styles.barContainer, small && styles.barSmall]}>
      <View style={[styles.bar, small && styles.barSmall, { backgroundColor: color, width: `${width}%` }]} />
    </View>
  </View>
);

HorizontalChartItem.propTypes = {
  color: string,
  currency: string.isRequired,
  small: bool,
  title: string.isRequired,
  value: number.isRequired,
  width: number,
};

import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Row, Text } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { PriceFriendly } from '../PriceFriendly';
import styles from './HorizontalChartItem.style';

const { COLOR } = THEME;

const HorizontalChartItem = ({ color, currency, small, title, value, width, ...inherit }) => (
  <View style={inherit.style}>
    <Row align="end">
      <Text caption color={COLOR.TEXT} bold={!small} style={styles.text}>
        {title}
      </Text>
      <PriceFriendly caption color={COLOR.TEXT} currency={currency} bold={!small} value={value} />
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

HorizontalChartItem.defaultProps = {
  color: COLOR.TEXT,
  small: false,
  width: 100,
};

export { HorizontalChartItem };

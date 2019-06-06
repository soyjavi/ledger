import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Text } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import PriceFriendly from '../PriceFriendly';
import styles from './HorizontalChartItem.style';

const { COLOR } = THEME;

const HorizontalChartItem = ({
  color, currency, small, title, value, width, ...inherit
}) => (
  <View style={inherit.style}>
    <View style={styles.row}>
      <Text caption lighten={small}>{title}</Text>
      <PriceFriendly currency={currency} subtitle level={3} lighten={small} value={value} />
    </View>

    <View style={[styles.bar, styles.barContainer, small && styles.barSmall]}>
      <View
        style={[
          styles.bar,
          small && styles.barSmall,
          { backgroundColor: color, width: `${width}%` },
        ]}
      />
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
  color: COLOR.PRIMARY,
  small: false,
  width: 100,
};

export default HorizontalChartItem;

import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Text } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import PriceFriendly from '../PriceFriendly';
import styles from './HorizontalChartItem.style';

const { COLOR } = THEME;

const HorizontalChartItem = ({
  color, currency, title, value, width,
}) => (
  <View>
    <View style={styles.row}>
      <Text subtitle level={3} style={styles.title}>{title}</Text>
      <PriceFriendly currency={currency} subtitle level={3} value={value} />
    </View>

    <View style={[styles.bar, styles.barContainer]}>
      <View
        style={[
          styles.bar,
          { backgroundColor: color, width: `${width}%` },
        ]}
      />
    </View>
  </View>
);

HorizontalChartItem.propTypes = {
  color: string,
  currency: string.isRequired,
  title: string.isRequired,
  value: number.isRequired,
  width: number,
};

HorizontalChartItem.defaultProps = {
  color: COLOR.PRIMARY,
  width: 100,
};

export default HorizontalChartItem;

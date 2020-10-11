import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Row, Text, View } from 'reactor/components';

import { PriceFriendly } from '../PriceFriendly';
import styles from './HorizontalChartItem.style';

const { COLOR } = THEME;

const HorizontalChartItem = ({ color = COLOR.TEXT, currency, small, title, value, width = 100, ...others }) => (
  <View {...others}>
    <Row align="end">
      <Text caption style={styles.text}>
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
  color: PropTypes.string,
  currency: PropTypes.string,
  small: PropTypes.bool,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
};

export { HorizontalChartItem };

import {
  arrayOf, bool, number, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Bars.style';

const { COLOR } = THEME;

const Bars = ({ color, inverted, values }) => {
  const max = values.length > 0 ? Math.max(...values) : 0;
  const floor = values.length > 0 && !inverted
    ? (Math.min(...(values.filter(value => value > 0))) / 1.015)
    : 0;

  return (
    <View style={[styles.container, inverted && styles.inverted]}>
      { values.map((value, index) => (
        <View
          key={`${index}-${value}`} // eslint-disable-line
          style={[
            styles.item,
            inverted && styles.itemInverted,
            {
              height: `${parseInt(((value - floor) * 100) / (max - floor), 10)}%`,
              opacity: value === 0 ? 0.2 : 1,
            },
            color && { backgroundColor: color },
          ]}
        />))}
    </View>
  );
};

Bars.propTypes = {
  color: string,
  inverted: bool,
  values: arrayOf(number),
};

Bars.defaultProps = {
  color: COLOR.PRIMARY,
  inverted: false,
  values: [],
};

export default Bars;

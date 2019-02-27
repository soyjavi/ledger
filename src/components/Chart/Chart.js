import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({ color, values }) => {
  const max = values.length > 0 ? Math.max(...values) : 0;
  const floor = values.length > 0
    ? (Math.min(...(values.filter(value => value > 0))) / 1.015)
    : 0;

  return (
    <View style={styles.container}>
      { values.map((value, index) => (
        <View
          key={`${index}-${value}`} // eslint-disable-line
          style={[
            styles.item,
            {
              backgroundColor: color,
              height: `${parseInt(((value - floor) * 100) / (max - floor), 10)}%`,
              opacity: value === 0 ? 0.2 : 1,
            },
          ]}
        />
      ))}
    </View>
  );
};

Chart.propTypes = {
  color: string,
  values: arrayOf(number),
};

Chart.defaultProps = {
  color: COLOR.ACCENT,
  values: [],
};

export default Chart;

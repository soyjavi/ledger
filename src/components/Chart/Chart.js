import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({ color, values }) => {
  let max = 0;
  let floor = 0;

  if (values.length) {
    max = Math.max(...values);
    floor = Math.min(...(values.filter(value => value > 0))) / 1.05;
  }

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

import { arrayOf, number, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({ color, series = [], values = [] }) => {
  const detailed = series.length > 7 || values.length > 7;
  let max = 0;
  let floor = 0;

  let sample = [];
  if (values.length > 0) sample = values;
  else {
    series.forEach((serie, index) => {
      sample[index] = serie ? Object.values(serie).reduce((a, b) => a += b) : 0;
    });
  }

  if (sample.length) {
    max = Math.max(...sample);
    floor = Math.min(...(sample.filter(value => value > 0))) / 1.05;
  }

  return (
    <View style={styles.container}>
      { sample.map((value, index) => (
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
  series: arrayOf(shape),
  values: arrayOf(number),
};

Chart.defaultProps = {
  color: COLOR.TEXT,
  series: [],
  values: [],
};

export default Chart;

import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Motion } from 'reactor/components';
import styles from './Chart.style';

const Chart = ({ color, dataSource }) => (
  <View style={styles.container}>
    { dataSource.map((value, index) => (
      <Motion
        key={index} // @eslint-disable-line
        style={[styles.bar, { height: `${value}%` }, color && { backgroundColor: color }]}
      />))}
  </View>
);

Chart.propTypes = {
  color: string,
  dataSource: arrayOf(number),
};

Chart.defaultProps = {
  color: undefined,
  dataSource: [10, 40, 50, 30, 80, 90, 50, 20, 20, 40, 50, 80],
};

export default Chart;

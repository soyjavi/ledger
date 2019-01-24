import { arrayOf, number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import Bars from './Bars';
import styles from './Chart.style';

const Chart = ({ balance, expenses, ...inherit }) => (
  <View style={styles.container}>
    <Bars values={balance} {...inherit} />
    <Bars values={expenses} {...inherit} inverted />
  </View>
);

Chart.propTypes = {
  balance: arrayOf(number),
  expenses: arrayOf(number),
};

Chart.defaultProps = {
  balance: [],
  expenses: [],
};

export default Chart;

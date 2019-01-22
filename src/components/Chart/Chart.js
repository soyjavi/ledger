import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import Bars from './Bars';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({
  balance, color, expenses, title,
}) => {
  const props = { color };

  return (
    <View>
      { title && <Text subtitle level={3} lighten style={styles.title}>{title}</Text> }
      <Bars values={balance} {...props} />
      <Bars values={expenses} {...props} inverted />
      { title && <Text subtitle level={3} lighten style={styles.title}>{title}</Text> }
    </View>
  );
};

Chart.propTypes = {
  balance: arrayOf(number),
  color: string,
  expenses: arrayOf(number),
  title: string,
};

Chart.defaultProps = {
  balance: [],
  color: COLOR.PRIMARY,
  expenses: [],
  title: undefined,
};

export default Chart;

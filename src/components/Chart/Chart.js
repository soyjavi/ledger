import {
  arrayOf, bool, number, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({
  color, inheritValue, title, values,
}) => {
  const max = values.length > 0 ? Math.max(...values) : 0;
  const min = values.length > 0 ? Math.min(...values) : 0;
  const style = [styles.bar, values.length > 12 && styles.barTiny];

  return (
    <View style={styles.container}>
      { title && <Text subtitle level={3} lighten style={styles.title}>{title}</Text> }
      <View style={styles.chart}>
        { values.map((value, index) => (
          <View
            key={`${index}-${value}`} // eslint-disable-line
            style={[
              ...style,
              {
                height: `${parseInt(((value - min) * 100) / (max - min), 10)}%`,
                opacity: inheritValue === value ? 0.2 : 1,
              },
              color && { backgroundColor: color },
            ]}
          />))}
      </View>
    </View>
  );
};

Chart.propTypes = {
  color: string,
  inheritValue: number,
  title: string,
  values: arrayOf(number),
};

Chart.defaultProps = {
  color: COLOR.PRIMARY,
  inheritValue: undefined,
  title: undefined,
  values: [],
};

export default Chart;

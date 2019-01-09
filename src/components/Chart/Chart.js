import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text, Motion } from '../../reactor/components';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({
  color, inheritValue, maxValue, title, values,
}) => {
  let max = maxValue;
  if (!max) max = values.length > 0 ? Math.max(...values) : 0;
  const style = [styles.bar, values.length > 12 && styles.barTiny];

  return (
    <View>
      { title && <Text subtitle level={3} lighten>{title}</Text> }
      <View style={styles.container}>
        { values.map((value, index) => (
          <Motion
            key={`${index}-${value}`} // eslint-disable-line
            style={[
              ...style,
              {
                height: `${parseInt((value * 100) / max, 10)}%`,
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
  maxValue: number,
  title: string,
  values: arrayOf(number),
};

Chart.defaultProps = {
  color: COLOR.PRIMARY,
  inheritValue: undefined,
  maxValue: undefined,
  title: undefined,
  values: [],
};

export default Chart;

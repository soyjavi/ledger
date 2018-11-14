import { arrayOf, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Motion } from '../../reactor/components';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({ color, values }) => {
  const max = values.length > 0 ? Math.max.apply(Math, values) : 0; // eslint-disable-line
  const style = [styles.bar, values.length > 12 && styles.barTiny];

  return (
    <View style={styles.container}>
      { values.map((value, index) => (
        <Motion
          key={`${index}-${value}`} // eslint-disable-line
          style={[
            ...style,
            {
              height: `${parseInt((value * 100) / max, 10)}%`,
              backgroundColor: value > 0 ? color : COLOR.BASE,
            },
          ]}
        />))}
    </View>
  );
};

Chart.propTypes = {
  color: string,
  values: arrayOf(number),
};

Chart.defaultProps = {
  color: undefined,
  values: [],
};

export default Chart;

import { arrayOf, number, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import styles from './Chart.style';

const { COLOR } = THEME;

const Chart = ({
  captions, color, series, values,
}) => {
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
    <View>
      <View style={[styles.row, styles.container, captions && styles.detailed]}>
        { sample.map((value, index) => (
          <View
            key={`${index}-${value}`} // eslint-disable-line
            style={[
              styles.item,
              captions && styles.itemDetailed,
              {
                backgroundColor: color,
                height: `${parseInt(((value - floor) * 100) / (max - floor), 10)}%`,
                opacity: value === 0 ? 0.2 : 1,
              },
            ]}
          />
        ))}
      </View>
      { captions && (
        <View style={[styles.row, styles.captions]}>
          { captions.map(caption => (
            <Text key={caption} caption level={2} lighten style={styles.caption}>{caption.substring(0, 3)}</Text>
          ))}
        </View>
      )}
    </View>

  );
};

Chart.propTypes = {
  captions: arrayOf(string),
  color: string,
  series: arrayOf(shape),
  values: arrayOf(number),
};

Chart.defaultProps = {
  captions: undefined,
  color: COLOR.TEXT,
  series: [],
  values: [],
};

export default Chart;

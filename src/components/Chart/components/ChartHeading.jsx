import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Heading } from '../../Heading';
import { PriceFriendly } from '../../PriceFriendly';

import styles from '../Chart.style';

const ChartHeading = ({ title, max, min, ...inherit }) => (
  <Heading value={title} style={styles.heading}>
    <View style={styles.row}>
      {max > 0 && <PriceFriendly {...inherit} label="max " value={max} style={styles.legend} />}
      {min > 0 && <PriceFriendly {...inherit} label="  min " value={min} style={styles.legend} />}
    </View>
  </Heading>
);

ChartHeading.propTypes = {
  max: number,
  min: number,
  title: string,
};

ChartHeading.defaultProps = {
  max: undefined,
  min: undefined,
  title: undefined,
};

export { ChartHeading };

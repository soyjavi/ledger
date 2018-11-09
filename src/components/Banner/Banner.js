import { shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Price, Text } from 'reactor/components';
import styles from './Banner.style';

const Banner = ({
  color, price, title,
}) => (
  <View style={[styles.container, color && { backgroundColor: color }]}>
    <Text headline level={4} numberOfLines={1} style={styles.text}>{title}</Text>
    <Price {...price} style={styles.text} />
  </View>
);

Banner.propTypes = {
  color: string,
  price: shape({}),
  title: string,
};

Banner.defaultProps = {
  color: undefined,
  price: {},
  title: undefined,
};

export default Banner;

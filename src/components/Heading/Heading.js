import {
  bool, node, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { Text } from '../../reactor/components';
import styles from './Heading.style';

const Heading = ({
  children, image, value, ...inherit
}) => (
  <View style={[styles.container, inherit.style]}>
    { image && <Image source={image} resizeMode="contain" style={styles.image} /> }
    <View style={styles.content}>
      { value && <Text color={inherit.color} subtitle>{value.toUpperCase()}</Text> }
    </View>
    { children }
  </View>
);

Heading.propTypes = {
  children: node,
  image: oneOfType([number, string]),
  value: string,
};

Heading.defaultProps = {
  children: undefined,
  image: undefined,
  value: undefined,
};

export { Heading };

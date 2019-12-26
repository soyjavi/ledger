import {
  bool, node, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { Text } from '../../reactor/components';
import styles from './Heading.style';

const Heading = ({
  breakline, children, image, subtitle, title, ...inherit
}) => (
  <View style={[styles.container, breakline && styles.breakline, inherit.style]}>
    { image && <Image source={image} resizeMode="contain" style={styles.image} /> }
    <View style={styles.content}>
      { title && <Text color={inherit.color} headline>{title.toUpperCase()}</Text> }
      { subtitle && <Text color={inherit.color} subtitle>{subtitle.toUpperCase()}</Text> }
    </View>
    { children }
  </View>
);

Heading.propTypes = {
  breakline: bool,
  children: node,
  image: oneOfType([number, string]),
  subtitle: string,
  title: string,
};

Heading.defaultProps = {
  breakline: false,
  children: undefined,
  image: undefined,
  subtitle: undefined,
  title: undefined,
};

export { Heading };

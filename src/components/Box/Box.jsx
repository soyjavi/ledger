import { node, number, string, bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

const Box = ({ borderRadius, children, color, opacity, small, ...inherit }) => (
  <View style={[styles.container, inherit.style]}>
    <View style={[styles.frame, { backgroundColor: color, borderRadius, opacity }]} />
    <View style={[styles.content, small && styles.small]}>{children}</View>
  </View>
);

Box.propTypes = {
  borderRadius: number,
  children: node,
  color: string,
  opacity: number,
  small: bool,
};

Box.defaultProps = {
  borderRadius: BORDER_RADIUS,
  children: undefined,
  color: COLOR.BASE,
  opacity: 0.68,
  small: false,
};

export { Box };

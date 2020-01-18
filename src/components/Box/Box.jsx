import { node, number, string, bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

const Box = ({ borderRadius, children, color, opacity, outlined, small, ...inherit }) => (
  <View style={[styles.container, inherit.style]}>
    <View
      style={[
        styles.frame,
        { borderRadius, opacity },
        outlined ? { borderWidth: 1, borderColor: color } : { backgroundColor: color },
      ]}
    />
    <View style={[styles.content, small && styles.small, inherit.styleContent]}>{children}</View>
  </View>
);

Box.propTypes = {
  borderRadius: number,
  children: node,
  color: string,
  opacity: number,
  outlined: bool,
  small: bool,
};

Box.defaultProps = {
  borderRadius: BORDER_RADIUS,
  children: undefined,
  color: COLOR.BASE,
  opacity: 1,
  outlined: false,
  small: false,
};

export { Box };

import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

interface BoxProps {
  borderRadius?: number,
  children: React.ReactNode,
  color?: string,
  opacity?: number,
  small?: boolean,
  style?: any,
};

const Box: React.FC<BoxProps> = ({
  borderRadius = BORDER_RADIUS, children, color = COLOR.BASE, opacity = 0.68, small = false, style
}) => (
  <View style={[styles.container, style]}>
    <View style={[styles.frame, { backgroundColor: color, borderRadius, opacity }]} />
    <View style={[styles.content, small && styles.small]}>
      {children}
    </View>
  </View>
);

export {Box};

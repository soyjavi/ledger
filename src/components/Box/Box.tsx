import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Box.style';

const { COLOR } = THEME;

interface BoxProps {
  children: React.ReactNode,
  color?: String,
  opacity?: Number,
  small?: Boolean,
  style?: any,
};

const Box: React.FC<BoxProps> = ({
  children, color = COLOR.BASE, opacity = 0.68, small = false, style
}) => (
  <View style={[styles.container, style]}>
    <View style={[styles.frame, { backgroundColor: color, opacity }]} />
    <View style={[styles.content, small && styles.small]}>
      {children}
    </View>
  </View>
);

export default Box;

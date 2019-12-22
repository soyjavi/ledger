import {
  bool, node, number, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Box.style';

const { COLOR, BORDER_RADIUS } = THEME;

const Box = ({
  children, color, opacity, small, ...inherit
}) => (
  <View style={[styles.container, inherit.style]}>
    <View style={[styles.frame, { backgroundColor: color, opacity }]} />
    <View style={[styles.content, small && styles.small]}>
      {children}
    </View>
  </View>
);

Box.propTypes = {
  children: node.isRequired,
  color: string,
  opacity: number,
  small: bool,
};

Box.defaultProps = {
  color: COLOR.BASE,
  opacity: 0.68,
  small: false,
};

export default Box;

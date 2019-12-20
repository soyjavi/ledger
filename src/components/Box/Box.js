import { node, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import styles from './Box.style';

const { COLOR } = THEME;

const Box = ({
  children, color, opacity, ...inherit
}) => (
  <View style={[styles.container, inherit.style]}>
    <View style={[styles.frame, { backgroundColor: color, opacity }]} />
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

Box.propTypes = {
  children: node.isRequired,
  color: string,
  opacity: number,
};

Box.defaultProps = {
  color: COLOR.BASE,
  opacity: 0.68,
};

export default Box;

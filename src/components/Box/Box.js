import { arrayOf, node, string } from 'prop-types';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './Box.style';

const Box = ({ children, colors, ...inherit }) => (
  <LinearGradient colors={colors} start={[0, 0]} end={[1, 1]} style={[styles.container, inherit.style]}>
    {children}
  </LinearGradient>
);

Box.propTypes = {
  children: node.isRequired,
  colors: arrayOf(string),
};

Box.defaultProps = {
  colors: ['#333', '#202020', '#202020'],
};

export default Box;

import { Motion } from '@lookiero/aurora';
import { MOTION } from 'expo-permissions';
import PropTypes from 'prop-types';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { style } from './Viewport.style';

export const Viewport = ({ backward = false, children, visible = true }) => {
  const { width } = useWindowDimensions();

  return (
    <Motion
      duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
      style={style.container}
      value={{ translateX: visible ? (backward ? -16 : 0) : width }}
    >
      {children}
    </Motion>
  );
};

Viewport.propTypes = {
  backward: PropTypes.bool,
  children: PropTypes.node,
  visible: PropTypes.bool,
};

import {
  // helpers
  COLOR,
  styles,
  // components
  Text,
  Touchable,
} from '@lookiero/aurora';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Button.style';

const Button = ({ children, disabled, onPress, ...others }) => (
  <Touchable {...others} style={styles(style.container, others.style)} onPress={onPress}>
    <LinearGradient
      // Button Linear Gradient
      colors={['#F7CE64', '#FFC491']}
      locations={[0, 1]}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 0, y: 0 }}
      style={[style.container, { width: '100%' }]}
    >
      <Text heading>{children.toLowerCase()}</Text>
    </LinearGradient>
  </Touchable>
);

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(COLOR)),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export { Button };

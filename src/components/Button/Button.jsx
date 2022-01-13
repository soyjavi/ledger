import {
  // helpers
  COLOR,
  styles,
  // components
  Text,
  Touchable,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Button.style';

const Button = ({ children, disabled, secondary = false, onPress, ...others }) => (
  <Touchable
    {...others}
    disabled={disabled}
    style={styles(style.container, secondary && style.secondary, disabled && style.disabled, others.style)}
    onPress={onPress}
  >
    <Text action color={disabled ? COLOR.GRAYSCALE_L : secondary ? COLOR.CONTENT : COLOR.BASE} level={2}>
      {children}
    </Text>
  </Touchable>
);

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  secondary: PropTypes.bool,
  onPress: PropTypes.func,
};

export { Button };

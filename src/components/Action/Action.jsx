import {
  // helpers
  COLOR,
  // components
  Text,
  Touchable,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

const Action = ({ disabled, children, color = COLOR.PRIMARY, onPress = () => {}, ...others }) => (
  <Touchable {...others} onPress={disabled ? undefined : onPress}>
    <Text action color={disabled ? COLOR.GRAYSCALE_L : color} upperCase>
      {children}
    </Text>
  </Touchable>
);

Action.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(COLOR)),
  onPress: PropTypes.func.isRequired,
};

export { Action };

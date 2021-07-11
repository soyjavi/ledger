import {
  // helpers
  COLOR,
  // components
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Box.style';

const Box = ({ children, color = COLOR.INFO, rounded, ...others }) => (
  <View {...others} backgroundColor={color} style={[style.container, rounded && style.rounded, others.style]}>
    {children}
  </View>
);

Box.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(COLOR)),
  rounded: PropTypes.bool,
};

export { Box };

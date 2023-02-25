import {
  // helpers
  COLOR,
  styles,
  // components
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Box.style';

const Box = ({ children, color = COLOR.INFO, ...others }) => (
  <View {...others} backgroundColor={color} style={styles(style.container, others.style)}>
    {children}
  </View>
);

Box.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(COLOR)),
};

export { Box };

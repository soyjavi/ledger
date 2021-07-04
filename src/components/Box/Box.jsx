import PropTypes from 'prop-types';
import React from 'react';

import {
  // helpers
  ALIGN,
  COLOR,
  // components
  View,
} from '@lookiero/aurora';

import { style } from './Box.style';

const Box = ({ children, color = COLOR.GRAYSCALE_XL, outlined, ...others }) => (
  <View
    {...others}
    alignItems={ALIGN.CENTER}
    alignContent={ALIGN.CENTER}
    backgroundColor={!outlined ? color : COLOR.TRANSPARENT}
    borderColor={outlined ? color : COLOR.TRANSPARENT}
    customStyle={[style.container, others.style]}
    justifyContent={ALIGN.CENTER}
  >
    {children}
  </View>
);

Box.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(COLOR)),
  outlined: PropTypes.bool,
};

export { Box };

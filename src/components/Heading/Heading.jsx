import {
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './Heading.style';

const Heading = ({ children, color, value = '', ...others }) => (
  <View {...others} style={[style.row, others.style]}>
    <Text color={color} action level={1} upperCase>
      {value}
    </Text>
    {children && <View style={style.children}>{children}</View>}
  </View>
);

Heading.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  value: PropTypes.string,
};

export { Heading };

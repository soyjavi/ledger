import { node, number, string, bool } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Col } from '../../reactor/components';
import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

const Box = ({ borderRadius, children, color, opacity, outlined, small, ...others }) => (
  <Col {...others} align="center" style={styles.container}>
    <View
      style={[
        styles.frame,
        { borderRadius, opacity },
        outlined ? { borderWidth: 1, borderColor: color } : { backgroundColor: color },
      ]}
    />
    <Col
      align="center"
      paddingHorizontal={!small ? 'M' : undefined}
      paddingVertical={!small ? 'M' : undefined}
      style={[styles.content, others.style]}
    >
      {children}
    </Col>
  </Col>
);

Box.propTypes = {
  borderRadius: number,
  children: node,
  color: string,
  opacity: number,
  outlined: bool,
  small: bool,
};

Box.defaultProps = {
  borderRadius: BORDER_RADIUS,
  children: undefined,
  color: COLOR.BASE,
  opacity: 1,
  outlined: false,
  small: false,
};

export { Box };

import { node, number, string, bool } from 'prop-types';
import React from 'react';

import { THEME } from '../../reactor/common';
import { Col } from '../../reactor/components';
import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

const Box = ({ borderRadius = BORDER_RADIUS, children, color = COLOR.BASE, elevate, outlined, ...others }) => (
  <Col
    {...others}
    align="center"
    style={[
      styles.container,
      elevate && styles.elevation,
      outlined ? { borderRadius, borderWidth: 1, borderColor: color } : { borderRadius, backgroundColor: color },
      others.style,
    ]}
  >
    {children}
  </Col>
);

Box.propTypes = {
  borderRadius: number,
  children: node,
  color: string,
  elevate: bool,
  opacity: number,
  outlined: bool,
};

export { Box };

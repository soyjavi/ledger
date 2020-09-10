import { node, number, string, bool } from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Col } from 'reactor/components';

import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

const Box = ({ borderRadius = BORDER_RADIUS, children, color = COLOR.BASE, outlined, ...others }) => (
  <Col
    {...others}
    align="center"
    style={[
      styles.container,
      {
        borderRadius,
        borderWidth: 1,
        borderColor: outlined ? color : COLOR.TRANSPARENT,
        backgroundColor: !outlined ? color : COLOR.TRANSPARENT,
      },
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
  opacity: number,
  outlined: bool,
};

export { Box };

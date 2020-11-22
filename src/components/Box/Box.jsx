import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Col } from 'reactor/components';

import styles from './Box.style';

const { BORDER_RADIUS, COLOR } = THEME;

const Box = ({ borderRadius = BORDER_RADIUS, children, color = COLOR.BASE, outlined, rounded, ...others }) => (
  <Col
    {...others}
    align="center"
    style={[
      styles.container,
      rounded && styles.rounded,
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
  borderRadius: PropTypes.number,
  children: PropTypes.node,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  opacity: PropTypes.number,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
};

export { Box };

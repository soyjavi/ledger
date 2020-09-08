import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Motion, Row } from 'reactor/components';

import styles from './Footer.style';

const { MOTION, UNIT } = THEME;

export const Footer = ({ children, visible }) => (
  <Motion
    duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
    timeline={[{ property: 'translateY', value: visible ? 0 : UNIT * 8 }]}
  >
    <Row style={styles.container}>{children}</Row>
  </Motion>
);

Footer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

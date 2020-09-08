import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Motion, Row } from 'reactor/components';

import styles from './Footer.style';

const { MOTION } = THEME;

export const Footer = ({ children, visible }) => (
  <Motion
    duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
    pointerEvents="auto"
    timeline={[{ property: 'translateY', value: visible ? 0 : 128 }]}
    type={visible ? 'spring' : undefined}
  >
    <Row style={styles.container}>{children}</Row>
  </Motion>
);

Footer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

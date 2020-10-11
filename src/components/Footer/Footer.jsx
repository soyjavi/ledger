import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Motion } from 'reactor/components';

import styles from './Footer.style';

const { MOTION, UNIT } = THEME;

const Footer = ({ children, visible }) => (
  <Motion
    delay={visible ? MOTION.EXPAND : undefined}
    duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
    pointerEvents="auto"
    style={styles.container}
    timeline={[{ property: 'translateY', value: visible ? 0 : UNIT * 8 }]}
  >
    {children}
  </Motion>
);

Footer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

export { Footer };

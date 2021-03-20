import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Motion, View } from 'reactor/components';

import styles from './Footer.style';

const { BLUR, MOTION, UNIT } = THEME;

const Footer = ({ children, visible }) => (
  <Motion
    delay={MOTION.COLLAPSE}
    duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
    pointerEvents="auto"
    style={styles.container}
    timeline={[{ property: 'translateY', value: visible ? 0 : UNIT * 16 }]}
  >
    <BlurView {...BLUR} style={styles.blur}>
      <View style={styles.content}>{children}</View>
    </BlurView>
  </Motion>
);

Footer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};

export { Footer };

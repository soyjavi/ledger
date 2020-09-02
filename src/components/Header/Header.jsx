import PropTypes from 'prop-types';

import React from 'react';
import { Image } from 'react-native';
import { THEME } from 'reactor/common';
import { Col, Icon, Motion, Row, Text, Touchable } from 'reactor/components';

import { LOGO } from '@assets';

import styles, { HEADER_HEIGHT } from './Header.style';

export { HEADER_HEIGHT };

const { ICON, MOTION } = THEME;

export const Header = ({ children, highlight = false, image = LOGO, onBack, title }) => (
  <Row paddingHorizontal="M" style={[styles.container, highlight && styles.solid]}>
    <Col align="start">
      {onBack && (
        <Touchable onPress={onBack}>
          <Icon family={ICON.FAMILY} value="arrow-left" />
        </Touchable>
      )}
    </Col>
    <Col align="center" style={styles.content}>
      <Motion
        duration={highlight ? MOTION.EXPAND : MOTION.COLLAPSE}
        timeline={[{ property: 'opacity', value: highlight ? 1 : 0 }]}
      >
        <Image source={image} style={styles.image} />
        <Text subtitle>{title}</Text>
      </Motion>
    </Col>
    <Col align="end">{children}</Col>
  </Row>
);

Header.propTypes = {
  children: PropTypes.node,
  highlight: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBack: PropTypes.func,
  title: PropTypes.string,
};

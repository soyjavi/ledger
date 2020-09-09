import PropTypes from 'prop-types';

import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Col, Motion, Row, Text } from 'reactor/components';

import { LOGO } from '@assets';
import { onHardwareBackPress } from '@common';

import styles, { HEADER_HEIGHT } from './Header.style';

export { HEADER_HEIGHT };

const { COLOR, ICON, MOTION, UNIT } = THEME;

export const Header = ({ childLeft, childRight, highlight = false, image = LOGO, onBack, title }) => {
  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <Row paddingHorizontal="M" style={[styles.container, highlight && styles.elevate]}>
      <Col align="start">
        {childLeft}
        {onBack && (
          <Button
            color={COLOR.BACKGROUND}
            colorText={COLOR.TEXT}
            iconFamily={ICON.FAMILY}
            icon="arrow-left"
            onPress={onBack}
            size="S"
          />
        )}
      </Col>
      <Col align="center" style={styles.content}>
        <Motion
          duration={highlight ? MOTION.EXPAND : MOTION.COLLAPSE / 4}
          timeline={[
            { property: 'opacity', value: highlight ? 1 : 0 },
            { property: 'translateY', value: highlight ? 0 : UNIT },
          ]}
        >
          <Row>
            <Image source={image} style={styles.image} />
            {title && <Text subtitle>{title}</Text>}
          </Row>
        </Motion>
      </Col>
      <Col align="end">{childRight}</Col>
    </Row>
  );
};

Header.propTypes = {
  childLeft: PropTypes.node,
  childRight: PropTypes.node,
  highlight: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBack: PropTypes.func,
  title: PropTypes.string,
};

import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Motion, Row, Text } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import styles from './Header.style';

const { BLUR, COLOR, ICON, MOTION, UNIT } = THEME;

const Header = ({ childLeft, childRight, highlight = false, onBack, title }) => {
  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <BlurView {...BLUR} style={styles.blur}>
      <Row paddingHorizontal="M" style={styles.container}>
        <Col align="start">
          {childLeft}
          {onBack && (
            <Button
              color={COLOR.TRANSPARENT}
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
            {title && (
              <Text bold subtitle>
                {title}
              </Text>
            )}
          </Motion>
        </Col>
        <Col align="end">{childRight}</Col>
      </Row>
    </BlurView>
  );
};

Header.propTypes = {
  childLeft: PropTypes.node,
  childRight: PropTypes.node,
  highlight: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.string,
};

export { Header };

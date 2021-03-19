import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Motion, Row, Text, View } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import styles from './Header.style';

const { BLUR, COLOR, ICON, MOTION } = THEME;

const Header = ({ childLeft, childRight, isVisible, onBack, title }) => {
  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <View style={styles.container}>
      <BlurView {...BLUR} intensity={isVisible === false ? 0 : undefined}>
        <Row paddingHorizontal="M" style={styles.content}>
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
          <Col align="center" style={styles.title}>
            <Motion duration={MOTION.EXPAND} timeline={[{ property: 'opacity', value: isVisible ? 1 : 0 }]}>
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
    </View>
  );
};

Header.propTypes = {
  childLeft: PropTypes.node,
  childRight: PropTypes.node,
  isVisible: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.string,
};

export { Header };

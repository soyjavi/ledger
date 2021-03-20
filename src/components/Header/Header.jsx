import { BlurView } from 'expo-blur';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Col, Row, Text, View } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import styles from './Header.style';

const { BLUR, COLOR, ICON } = THEME;

const Header = ({ childLeft, childRight, isVisible, onBack, title }) => {
  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <View style={[styles.container, isVisible && styles.visible]}>
      <StatusBar animated translucent backgroundColor={COLOR.TRANSPARENT} />
      <BlurView {...BLUR} intensity={isVisible === false ? 0 : 90} style={styles.blur}>
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
            {title && isVisible && (
              <Text bold subtitle>
                {title}
              </Text>
            )}
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

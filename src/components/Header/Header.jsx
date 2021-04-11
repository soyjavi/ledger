import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Col, Row, Text, View } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import styles from './Header.style';

const { BLUR, COLOR, ICON } = THEME;

const Header = ({ button, visible, onBack, title }) => {
  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <>
      <StatusBar style="light" translucent />
      <View style={styles.container}>
        <BlurView {...BLUR} intensity={visible ? BLUR.intensity : 0} style={styles.blur}>
          <SafeAreaView>
            <Row paddingHorizontal="M" style={styles.content}>
              <Col align="start">
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
                {title && (
                  <Text bold color={visible ? COLOR.TEXT : COLOR.LIGHTEN} subtitle>
                    {title}
                  </Text>
                )}
              </Col>
              <Col align="end">{button}</Col>
            </Row>
          </SafeAreaView>
        </BlurView>
      </View>
    </>
  );
};

Header.propTypes = {
  button: PropTypes.node,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onBack: PropTypes.func,
};

export { Header };

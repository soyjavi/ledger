import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Col, Row, Text } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import styles from './Header.style';

const { COLOR, ICON } = THEME;

const Header = ({ button, visible, onBack, title }) => {
  useEffect(() => {
    onHardwareBackPress(onBack !== undefined, onBack);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBack]);

  return (
    <SafeAreaView style={[styles.container, visible && styles.visible]}>
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
  );
};

Header.propTypes = {
  button: PropTypes.node,
  onBack: PropTypes.func,
  title: PropTypes.string,
  visible: PropTypes.bool,
};

export { Header };

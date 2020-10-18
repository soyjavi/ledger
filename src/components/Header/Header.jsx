import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Motion, Row, Text } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import { CurrencyLogo } from '../CurrencyLogo';
import styles, { HEADER_HEIGHT } from './Header.style';

const { COLOR, ICON, MOTION, UNIT } = THEME;

const Header = ({ childLeft, childRight, currency, highlight = false, onBack, title }) => {
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
            <CurrencyLogo currency={currency} marginRight="S" _size="S" />
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
  currency: PropTypes.string,
  highlight: PropTypes.bool,
  onBack: PropTypes.func,
  title: PropTypes.string,
};

export { Header, HEADER_HEIGHT };

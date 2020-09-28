import { bool, shape, func } from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Row, Text, Touchable } from 'reactor/components';

import { Box, CurrencyLogo, PriceFriendly } from '@components';

import styles from './VaultItem.style';

const { COLOR, ICON, OPACITY } = THEME;

export const VaultItem = ({ active, onChange, onPress, dataSource: { currency, currentBalance, title } }) => {
  const colorText = active ? COLOR.TEXT : COLOR.LIGHTEN;

  return (
    <Row>
      <Touchable
        paddingHorizontal="M"
        paddingVertical="S"
        onPress={onPress}
        rippleColor={COLOR.RIPPLE}
        style={[styles.container, !active && { opacity: OPACITY.M }]}
      >
        <Row>
          <Col marginRight="S" width="auto">
            <Box small outlined styleContent={styles.boxContent}>
              <CurrencyLogo currency={currency} size="S" />
            </Box>
          </Col>
          <Col>
            <Text color={colorText} numberOfLines={1}>
              {title}
            </Text>
            <PriceFriendly caption color={COLOR.LIGHTEN} currency={currency} value={currentBalance} />
          </Col>
        </Row>
      </Touchable>
      <Button
        color={COLOR.BACKGROUND}
        colorText={colorText}
        icon={active ? 'lock-open' : 'lock'}
        iconFamily={ICON.FAMILY}
        marginRight="S"
        onPress={() => onChange(!active)}
      />
    </Row>
  );
};

VaultItem.propTypes = {
  active: bool,
  dataSource: shape({}).isRequired,
  onChange: func.isRequired,
  onPress: func.isRequired,
};

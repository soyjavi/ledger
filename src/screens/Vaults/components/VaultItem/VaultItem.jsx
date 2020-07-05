import { bool, shape, func } from 'prop-types';

import React from 'react';
import { Image } from 'react-native';
import { THEME } from 'reactor/common';
import { Icon, Col, Row, Text, Touchable } from 'reactor/components';

import { FLAGS } from '@assets';
import { Box, PriceFriendly } from '@components';

import styles from './VaultItem.style';

const { COLOR, ICON, SPACE } = THEME;

export const VaultItem = ({ active, onChange, onPress, dataSource: { currency, currentBalance, title } }) => {
  const disabled = !active;

  return (
    <Row>
      <Touchable onPress={onPress} rippleColor={COLOR.TEXT} style={styles.container}>
        <Row>
          <Col marginRight="S" width="auto" style={disabled && styles.disabled}>
            <Box small outlined={currentBalance === 0} styleContent={styles.boxContent}>
              <Image source={FLAGS[currency]} style={styles.flag} />
            </Box>
          </Col>
          <Col>
            <Text bold={active} color={!active ? COLOR.LIGHTEN : undefined} numberOfLines={1}>
              {title}
            </Text>
            <PriceFriendly bold={active} caption color={COLOR.LIGHTEN} currency={currency} value={currentBalance} />
          </Col>
        </Row>
      </Touchable>
      <Touchable marginRight="M" onPress={() => onChange(!active)} padding="S" value={active}>
        <Icon
          color={!active ? COLOR.LIGHTEN : undefined}
          family={ICON.FAMILY}
          size={SPACE.M}
          value={active ? 'lock-open' : 'lock'}
        />
      </Touchable>
    </Row>
  );
};

VaultItem.propTypes = {
  active: bool,
  dataSource: shape({}).isRequired,
  onChange: func.isRequired,
  onPress: func.isRequired,
};

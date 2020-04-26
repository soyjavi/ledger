import { bool, shape, func } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { FLAGS } from '../../../../assets';
import { THEME } from '../../../../reactor/common';
import { Icon, Col, Row, Text, Touchable } from '../../../../reactor/components';

import { Box, PriceFriendly } from '../../../../components';
import styles from './VaultItem.style';

const { COLOR } = THEME;

export const VaultItem = ({ active, onChange, onPress, dataSource: { currency, currentBalance, title } }) => {
  const disabled = !active;

  return (
    <Row style={disabled && styles.disabled}>
      <Touchable onPress={onPress} rippleColor={COLOR.TEXT} style={styles.container}>
        <Row>
          <Col marginRight="S" width="auto">
            <Box small outlined={currentBalance === 0} styleContent={styles.boxContent}>
              <Image source={FLAGS[currency]} style={styles.flag} />
            </Box>
          </Col>
          <Col>
            <Text numberOfLines={1}>{title}</Text>
            <PriceFriendly caption color={COLOR.LIGHTEN} currency={currency} value={currentBalance} />
          </Col>
        </Row>
      </Touchable>
      <Touchable onPress={() => onChange(!active)} value={active} style={styles.switch}>
        <Icon size={24} value={active ? 'eye-outline' : 'eye-off-outline'} />
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

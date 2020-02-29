import { bool, shape, func } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { FLAGS } from '../../../../assets';
import { THEME } from '../../../../reactor/common';
import { Icon, Col, Row, Text, Touchable } from '../../../../reactor/components';

import { exchange } from '../../../../common';
import { Box, PriceFriendly } from '../../../../components';
import { useStore } from '../../../../context';
import styles from './VaultItem.style';

const { COLOR } = THEME;

const OptionItem = ({ active, onChange, onPress, dataSource: { currency, currentBalance, title } }) => {
  const { baseCurrency, rates } = useStore();
  const disabled = !active;

  return (
    <Row style={disabled && styles.disabled}>
      <Touchable onPress={onPress} rippleColor={COLOR.TEXT} style={styles.container}>
        <Row>
          <Col marginRight="S" width="auto">
            <Box small outlined styleContent={styles.boxContent}>
              <Image source={FLAGS[currency]} style={styles.flag} />
            </Box>
          </Col>
          <Col>
            <Text numberOfLines={1}>{title}</Text>
            <Row>
              <PriceFriendly
                caption
                color={COLOR.LIGHTEN}
                currency={baseCurrency}
                value={
                  currency !== baseCurrency ? exchange(currentBalance, currency, baseCurrency, rates) : currentBalance
                }
                style={styles.balance}
              />
              {currency !== baseCurrency && (
                <>
                  <Text caption>(</Text>
                  <PriceFriendly caption currency={currency} value={currentBalance} />
                  <Text caption>)</Text>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Touchable>
      <Touchable onPress={() => onChange(!active)} value={active} style={styles.switch}>
        <Icon size={24} value={active ? 'eye-outline' : 'eye-off-outline'} />
      </Touchable>
    </Row>
  );
};

OptionItem.propTypes = {
  active: bool,
  dataSource: shape({}).isRequired,
  onChange: func.isRequired,
  onPress: func.isRequired,
};

OptionItem.defaultProps = {
  active: false,
};

export default OptionItem;

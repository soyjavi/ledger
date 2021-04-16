import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Row, Text, Touchable } from 'reactor/components';

import { Box, CurrencyLogo, PriceFriendly } from '@components';
import { useStore } from '@context';

import styles from './VaultItem.style';

const { COLOR } = THEME;

const VaultItem = ({ onPress, dataSource: { currency, currentBalance, title } }) => {
  const {
    settings: { baseCurrency },
  } = useStore();

  const noBalance = currentBalance === 0;

  return (
    <Touchable
      paddingHorizontal="M"
      paddingVertical="S"
      rippleColor={COLOR.LIGHTEN}
      onPress={onPress}
      style={styles.container}
    >
      <Row>
        <Col marginRight="S" width="auto">
          <Box outlined={noBalance} styleContent={styles.boxContent}>
            <CurrencyLogo
              color={currency !== baseCurrency || noBalance ? COLOR.LIGHTEN : undefined}
              currency={currency}
              size="S"
            />
          </Box>
        </Col>
        <Col>
          <Text color={noBalance ? COLOR.LIGHTEN : undefined} numberOfLines={1}>
            {title}
          </Text>
          <PriceFriendly caption color={COLOR.LIGHTEN} currency={currency} value={currentBalance} />
        </Col>
      </Row>
    </Touchable>
  );
};

VaultItem.propTypes = {
  dataSource: PropTypes.shape({
    currency: PropTypes.string,
    currentBalance: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export { VaultItem };

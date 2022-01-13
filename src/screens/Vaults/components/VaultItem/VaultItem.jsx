import {
  //helpers
  COLOR,
  Theme,
  // components
  Touchable,
  View,
  Text,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { colorOpacity, getCurrencySymbol } from '@common';
import { Box, PriceFriendly } from '@components';
import { useStore } from '@context';

import { style } from './VaultItem.style';

const VaultItem = ({ onPress, dataSource: { currency, currentBalance = 0, title } }) => {
  const {
    settings: { baseCurrency },
  } = useStore();

  const hasBalance =
    currentBalance !== undefined && currentBalance !== null && parseFloat(currentBalance.toFixed(2)) > 0;

  const isBaseCurrency = currency === baseCurrency;

  return (
    <Touchable style={style.container} onPress={onPress}>
      <Box
        color={!hasBalance ? COLOR.BASE : isBaseCurrency ? COLOR.PRIMARY : undefined}
        style={[
          style.box,
          hasBalance && isBaseCurrency && { backgroundColor: colorOpacity(Theme.get('colorPrimary'), 0.2) },
          !hasBalance && style.outlined,
        ]}
      >
        <Text
          color={hasBalance ? (isBaseCurrency ? COLOR.PRIMARY : COLOR.CONTENT) : COLOR.GRAYSCALE_L}
          style={style.currency}
        >
          {getCurrencySymbol(currency)}
        </Text>
      </Box>
      <View>
        <Text color={!hasBalance ? COLOR.GRAYSCALE_L : undefined} numberOfLines={1}>
          {title}
        </Text>
        <PriceFriendly color={COLOR.GRAYSCALE_L} currency={currency} detail level={2} value={currentBalance} />
      </View>
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

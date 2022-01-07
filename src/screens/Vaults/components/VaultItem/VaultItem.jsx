import {
  //helpers
  COLOR,
  POINTER,
  // components
  Touchable,
  View,
  Text,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { Box, CurrencyLogo, PriceFriendly } from '@components';
import { useStore } from '@context';

import { style } from './VaultItem.style';

const VaultItem = ({ onPress, dataSource: { currency, currentBalance = 0, title } }) => {
  const {
    settings: { baseCurrency },
  } = useStore();

  const hasBalance =
    currentBalance !== undefined && currentBalance !== null && parseFloat(currentBalance.toFixed(2)) > 0;

  return (
    <Touchable style={style.container} onPress={onPress}>
      <Box pointerEvents={POINTER.NONE} style={style.box}>
        <CurrencyLogo
          color={currency !== baseCurrency || !hasBalance ? COLOR.GRAYSCALE_L : undefined}
          currency={currency}
        />
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

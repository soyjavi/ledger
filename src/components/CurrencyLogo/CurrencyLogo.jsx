import {
  // helpers
  ALIGN,
  COLOR,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { getCurrencySymbol } from '@common';

import { style } from './CurrencyLogo.style';

const CurrencyLogo = ({ color = COLOR.PRIMARY, currency, ...others }) => {
  const symbol = getCurrencySymbol(currency);

  return (
    <View
      {...others}
      alignItems={ALIGN.CENTER}
      backgroundColor={color}
      justifyContent={ALIGN.CENTER}
      style={[style.container, others.style]}
    >
      {symbol && (
        <Text
          color={color !== COLOR.BASE && color !== COLOR.GRAYSCALE_XL ? COLOR.BASE : undefined}
          detail
          level={symbol.length === 1 ? 2 : undefined}
          style={style.currency}
        >
          {symbol}
        </Text>
      )}
    </View>
  );
};

CurrencyLogo.propTypes = {
  color: PropTypes.string,
  currency: PropTypes.string,
};

export { CurrencyLogo };

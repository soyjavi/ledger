import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Text, View } from 'reactor/components';

import { C } from '@common';

import styles from './CurrencyLogo.style';

const { CURRENCY_COLOR, SYMBOL } = C;
const { COLOR, FONT } = THEME;

const NO_SYMBOL = ['XAG', 'XAU'];

export const CurrencyLogo = ({ currency, highlight, size = 'M', ...others }) => {
  const symbol = NO_SYMBOL.includes(currency) ? undefined : currency && SYMBOL[currency];

  return (
    <View
      {...others}
      style={[
        styles.container,
        styles[size],
        { backgroundColor: highlight ? COLOR.BACKGROUND : CURRENCY_COLOR[currency] || COLOR.TEXT },
      ]}
    >
      {symbol && (
        <Text
          color={highlight ? COLOR.TEXT : COLOR.BACKGROUND}
          caption={symbol.length > 1}
          style={[FONT.CURRENCY, styles.font, styles[`font${size}`]]}
        >
          {symbol}
        </Text>
      )}
    </View>
  );
};

CurrencyLogo.propTypes = {
  currency: PropTypes.string,
  highlight: PropTypes.bool,
  size: PropTypes.bool,
};

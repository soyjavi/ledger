import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Text, View } from 'reactor/components';

import { C } from '@common';

import styles from './CurrencyLogo.style';

const { SYMBOL } = C;
const { COLOR, FONT } = THEME;

const NO_SYMBOL = ['XAG', 'XAU'];

const CurrencyLogo = ({ color = COLOR.BRAND, currency, size = 'M', ...others }) => {
  const symbol = NO_SYMBOL.includes(currency) ? undefined : currency && SYMBOL[currency];

  return (
    <View {...others} style={[styles.container, styles[size], { backgroundColor: color }]}>
      {symbol && (
        <Text
          bold={size === 'L'}
          caption={symbol.length > 1}
          color={COLOR.BACKGROUND}
          style={[FONT.CURRENCY, styles.font, styles[`font${size}`]]}
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
  size: PropTypes.string,
};

export { CurrencyLogo };

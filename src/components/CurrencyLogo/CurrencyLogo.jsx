import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Text, View } from 'reactor/components';

import { C } from '@common';

import styles from './CurrencyLogo.style';

const { SYMBOL } = C;
const { COLOR, FONT } = THEME;

const NO_SYMBOL = ['XAG', 'XAU'];

const CurrencyLogo = ({ color = COLOR.BRAND, currency, ...others }) => {
  const symbol = NO_SYMBOL.includes(currency) ? undefined : currency && SYMBOL[currency];

  return (
    <View {...others} style={[styles.container, { backgroundColor: color }]}>
      {symbol && (
        <Text bold caption={symbol.length > 1} color={COLOR.BASE} style={[FONT.CURRENCY, styles.font]}>
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

import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Text, View } from 'reactor/components';

import { C } from '@common';

import styles from './CurrencyLogo.style';

const { CURRENCY_COLOR, SYMBOL } = C;
const { COLOR, FONT } = THEME;

export const CurrencyLogo = ({ currency, highlight, size = 'M', ...others }) => (
  <View
    {...others}
    style={[
      styles.container,
      styles[size],
      { backgroundColor: highlight ? COLOR.BACKGROUND : CURRENCY_COLOR[currency] || COLOR.TEXT },
    ]}
  >
    {currency && (
      <Text
        color={highlight ? COLOR.TEXT : COLOR.BACKGROUND}
        // subtitle={size === 'L'}
        // caption={size === 'S'}
        style={[FONT.CURRENCY, styles.font, styles[`font${size}`]]}
      >
        {SYMBOL[currency]}
      </Text>
    )}
  </View>
);

CurrencyLogo.propTypes = {
  currency: PropTypes.string,
  highlight: PropTypes.bool,
  size: PropTypes.bool,
};

import {
  // helpers
  FLEX_DIRECTION,
  Theme,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { C, colorOpacity, currencyDecimals } from '@common';
import { useStore } from '@context';

import { format } from './helpers';
import { style } from './PriceFriendly.style';

const { SYMBOL } = C;

const LEFT_SYMBOLS = ['$', '£'];

const PriceFriendly = ({ currency, fixed, highlight, label, maskAmount, operator, value = 0, ...others }) => {
  const { settings = {} } = useStore();

  const maskedAmount = maskAmount !== undefined ? maskAmount : settings.maskAmount;
  const operatorEnhanced = (operator && parseFloat(value, 10) !== 0) || value < 0 ? (value > 0 ? '+' : '-') : undefined;
  const symbol = SYMBOL[currency] || currency;
  let { color } = others;

  const symbolProps = {
    ...others,
    children: symbol,
    color,
    style: style.symbol,
  };

  const formatedValue = format({
    fixed: fixed !== undefined ? fixed : currencyDecimals(value, currency),
    mask: maskedAmount,
    numberOfLines: 1,
    value: Math.abs(value),
  });

  return (
    <View
      style={
        highlight && !maskAmount
          ? [style.highlight, { backgroundColor: colorOpacity(Theme.get('colorPrimary'), 0.2) }]
          : undefined
      }
      flexDirection={FLEX_DIRECTION.ROW}
    >
      {label && (
        <Text {...others} color={color}>
          {label}
        </Text>
      )}
      {maskedAmount ? (
        <Text {...others} color={color}>
          {formatedValue}
        </Text>
      ) : (
        <>
          {operatorEnhanced && (
            <Text {...others} color={color}>
              {operatorEnhanced}
            </Text>
          )}
          {LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
          <Text {...others} style={[style.value, others.style]} color={color}>
            {formatedValue}
          </Text>
          {!LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
        </>
      )}
    </View>
  );
};

PriceFriendly.propTypes = {
  currency: PropTypes.string,
  fixed: PropTypes.number,
  highlight: PropTypes.bool,
  label: PropTypes.string,
  maskAmount: PropTypes.bool,
  operator: PropTypes.bool,
  value: PropTypes.number,
};

export { PriceFriendly };

import PropTypes from 'prop-types';
import React from 'react';
import {
  // helpers
  FLEX_DIRECTION,
  Theme,
  // components
  Text,
  View,
} from '@lookiero/aurora';

import { C, colorOpacity, currencyDecimals } from '@common';
import { useStore } from '@context';

import { format } from './modules';
import { style } from './PriceFriendly.style';

const { SYMBOL } = C;
const { colorPrimary } = Theme.get();

const LEFT_SYMBOLS = ['$', '£'];

const PriceFriendly = ({ currency, fixed, highlight, label, maskAmount, operator, value = 0, ...others }) => {
  const { settings } = useStore();

  const maskedAmount = maskAmount || settings.maskAmount;
  const operatorEnhanced = operator && value !== 0 ? (value > 0 ? '+' : '-') : '';
  const symbol = SYMBOL[currency] || currency;
  let { color } = others;

  const valueProps = {
    fixed: fixed || currencyDecimals(value, currency),
    numberOfLines: 1,
    value: Math.abs(value),
  };

  const symbolProps = {
    ...others,
    children: symbol,
    color,
    customStyle: [style.symbol],
  };

  const formatedValue = format({
    fixed: fixed || currencyDecimals(value, currency),
    mask: maskedAmount,
    numberOfLines: 1,
    value: Math.abs(value),
  });

  return (
    <View
      customStyle={
        highlight && !maskAmount ? [style.highlight, { backgroundColor: colorOpacity(colorPrimary) }] : undefined
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
          <Text {...others} color={color}>
            {operatorEnhanced}
          </Text>
          {LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
          <Text {...others} customStyle={[style.value, others.customStyle]} color={color}>
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

import { bool, number, string } from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Price, Row, Text } from 'reactor/components';
import { format } from 'reactor/components/Price/modules';

import { C, currencyDecimals } from '@common';
import { useStore } from '@context';

import styles from './PriceFriendly.style';

const { SYMBOL } = C;
const { FONT } = THEME;

const MASK_SYMBOL = '*';
const LEFT_SYMBOLS = ['$', '£'];

const maskValue = ({ value }) =>
  format({
    value: value >= 1000 ? 9999 : 9.99,
  }).replace(/[0-9]/gi, MASK_SYMBOL);

const PriceFriendly = ({ currency, fixed, highlight, label, operator, maskAmount, value = 0, ...others }) => {
  const { settings } = useStore();

  const maskedAmount = maskAmount || settings.maskAmount;

  let { color } = others;
  let operatorEnhanced;

  if (operator && value > 0) operatorEnhanced = '+';
  else if (operator && value < 0) operatorEnhanced = '-';

  const props = {
    ...others,
    color,
    fixed: fixed !== undefined ? fixed : currencyDecimals(value, currency),
    numberOfLines: 1,
    operator: operatorEnhanced,
    // symbol: SYMBOL[currency] || currency,
    value: Math.abs(value),
  };

  const symbol = SYMBOL[currency] || currency;

  const symbolProps = {
    ...others,
    children: symbol,
    color: color,
    style: [FONT.CURRENCY, styles.currency, styles[`currency`]],
  };

  return (
    <Row style={highlight && !maskAmount ? styles.highlight : undefined} width="auto">
      {label && (
        <Text {...others} bold={false} color={color}>
          {label}
        </Text>
      )}
      {maskedAmount ? (
        <Text {...others} color={color}>
          {maskValue(props)}
        </Text>
      ) : (
        <>
          {LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
          <Price {...props} style={others.style} />
          {!LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
        </>
      )}
    </Row>
  );
};

PriceFriendly.propTypes = {
  currency: string,
  fixed: number,
  highlight: bool,
  label: string,
  maskAmount: bool,
  operator: bool,
  value: number,
};

export { PriceFriendly };

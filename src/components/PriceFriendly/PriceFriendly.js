import { bool, number, string } from 'prop-types';
import React from 'react';

import { C } from '../../common';
import { Price, Text } from '../../reactor/components';

const { FIXED, SYMBOL } = C;

const MASKS = {
  I: /1/gi,
  Z: /2/gi,
  E: /3/gi,
  A: /4/gi,
  s: /5/gi,
  b: /6/gi,
  P: /7/gi,
  Q: /8/gi,
  G: /9/gi,
  O: /0/gi,
};

const maskValue = (value = 0) => {
  let strValue = parseInt(value, 10).toString();

  Object.keys(MASKS).forEach((key) => {
    strValue = strValue.replace(MASKS[key], key);
  });

  strValue = strValue.replace(/1/gi, 'I');
  // console.log(value, strValue);
  // return '*'.repeat(parseInt(value, 10).toString().length);
  return strValue;
};

const PriceFriendly = ({
  currency, mask, value = 0, ...inherit
}) => (
  mask
    ? <Text {...inherit}>{`${maskValue(value)}${SYMBOL[currency]}`}</Text>
    : (
      <Price
        fixed={value < 1000 ? FIXED[currency] : 0}
        symbol={SYMBOL[currency]}
        value={Math.abs(value)}
        {...inherit}
      />
    )
);

PriceFriendly.propTypes = {
  currency: string,
  mask: bool,
  value: number,
};

PriceFriendly.defaultProps = {
  currency: undefined,
  mask: false,
  value: 0,
};

export default PriceFriendly;

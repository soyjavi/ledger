import { number, string } from 'prop-types';
import React from 'react';

import { C } from '../../common';
import { Price } from '../../reactor/components';

const { FIXED, SYMBOL } = C;

const PriceFriendly = ({ currency, value, ...inherit }) => (
  <Price
    fixed={value < 1000 ? FIXED[currency] : 0}
    symbol={SYMBOL[currency]}
    value={Math.abs(value)}
    {...inherit}
  />
);

PriceFriendly.propTypes = {
  currency: string,
  value: number,
};

PriceFriendly.defaultProps = {
  currency: undefined,
  value: 0,
};

export default PriceFriendly;

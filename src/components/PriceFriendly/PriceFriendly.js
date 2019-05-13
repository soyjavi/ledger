import { bool, number, string } from 'prop-types';
import React from 'react';

import { C } from '../../common';
import { Price, Text } from '../../reactor/components';
import { format } from '../../reactor/components/Price/modules';

const { FIXED, SYMBOL } = C;
const maskValue = props => format({ ...props, fixed: 0 }).replace(/[0-9]/gi, '*');

const PriceFriendly = ({
  currency, mask, value = 0, ...inherit
}) => {
  const props = {
    ...inherit,
    fixed: value < 1000 ? FIXED[currency] || 0 : 0,
    symbol: SYMBOL[currency] || currency,
    value: Math.abs(value),
  };

  return mask ? <Text {...inherit}>{maskValue(props)}</Text> : <Price {...props} />;
};

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

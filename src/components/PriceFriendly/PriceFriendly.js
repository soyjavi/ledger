import { bool, number, string } from 'prop-types';
import React from 'react';

import { C } from '../../common';
import { Price, Text } from '../../reactor/components';

const { FIXED, SYMBOL } = C;

const PriceFriendly = ({
  currency, mask, value = 0, ...inherit
}) => (
  mask
    ? <Text {...inherit}>{`${'?'.repeat(parseInt(value, 10).toString().length)} ${SYMBOL[currency]}`}</Text>
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

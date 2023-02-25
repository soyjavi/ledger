import PropTypes from 'prop-types';
import React from 'react';

import { Heading, PriceFriendly } from '@components';

const ChartHeading = ({ color, currency, max, min, title }) => (
  <Heading value={title}>
    {min > 0 && <PriceFriendly color={color} currency={currency} detail fixed={0} label="min " value={min} />}
    {max > 0 && <PriceFriendly color={color} currency={currency} detail fixed={0} label="  max " value={max} />}
  </Heading>
);

ChartHeading.propTypes = {
  color: PropTypes.string,
  currency: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  title: PropTypes.string,
};

export { ChartHeading };

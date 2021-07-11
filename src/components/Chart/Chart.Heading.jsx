import PropTypes from 'prop-types';
import React from 'react';

import { Heading } from '../Heading';
import { PriceFriendly } from '../PriceFriendly';

const ChartHeading = ({ color, inverted, max, min, title }) => (
  <Heading style={inverted && { position: 'absolute', bottom: 0 }} value={title}>
    {min > 0 && <PriceFriendly color={color} detail label="min " value={min} />}
    {max > 0 && <PriceFriendly color={color} detail label="  max " value={max} />}
  </Heading>
);

ChartHeading.propTypes = {
  color: PropTypes.string,
  inverted: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  title: PropTypes.string,
};

export { ChartHeading };

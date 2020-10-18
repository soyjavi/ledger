import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'reactor/components';

import { Heading } from '../Heading';
import { PriceFriendly } from '../PriceFriendly';

const ChartHeading = ({ inverted, max, min, title, ...others }) => (
  <Heading style={inverted ? { position: 'absolute', bottom: 0 } : undefined} value={title}>
    <Row marginTop="S" width="auto">
      {min > 0 && <PriceFriendly {...others} bold caption label="min " value={min} />}
      {max > 0 && <PriceFriendly {...others} bold caption label="  max " value={max} />}
    </Row>
  </Heading>
);

ChartHeading.propTypes = {
  inverted: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  title: PropTypes.string,
};

export { ChartHeading };

import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'reactor/components';

import { Heading } from '../../Heading';
import { PriceFriendly } from '../../PriceFriendly';

import styles from '../Chart.style';

const ChartHeading = ({ inverted, max, min, title, ...others }) => (
  <Heading marginBottom="XS" style={inverted ? { position: 'absolute', bottom: 0 } : undefined} value={title}>
    <Row marginTop="S" width="auto">
      {max > 0 && <PriceFriendly {...others} bold label="max " value={max} style={styles.legend} />}
      {min > 0 && <PriceFriendly {...others} bold label="  min " value={min} style={styles.legend} />}
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

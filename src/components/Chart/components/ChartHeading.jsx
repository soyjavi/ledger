import { number, string } from 'prop-types';
import React from 'react';

import { Row } from '../../../reactor/components';
import { Heading } from '../../Heading';
import { PriceFriendly } from '../../PriceFriendly';

import styles from '../Chart.style';

const ChartHeading = ({ title, max, min, ...inherit }) => (
  <Heading value={title}>
    <Row width="auto">
      {max > 0 && <PriceFriendly {...inherit} label="max " value={max} style={styles.legend} />}
      {min > 0 && <PriceFriendly {...inherit} label="  min " value={min} style={styles.legend} />}
    </Row>
  </Heading>
);

ChartHeading.propTypes = {
  max: number,
  min: number,
  title: string,
};

ChartHeading.defaultProps = {
  max: undefined,
  min: undefined,
  title: undefined,
};

export { ChartHeading };

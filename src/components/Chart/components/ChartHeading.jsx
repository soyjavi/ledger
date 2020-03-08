import { number, string } from 'prop-types';
import React from 'react';

import { Row } from '../../../reactor/components';
import { Heading } from '../../Heading';
import { PriceFriendly } from '../../PriceFriendly';

import styles from '../Chart.style';

const ChartHeading = ({ title, max, min, ...others }) => (
  <Heading value={title}>
    <Row marginTop="S" width="auto">
      {max > 0 && <PriceFriendly {...others} label="max " value={max} style={styles.legend} />}
      {min > 0 && <PriceFriendly {...others} label="  min " value={min} style={styles.legend} />}
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

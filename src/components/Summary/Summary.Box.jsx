import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Text } from 'reactor/components';

import { PriceFriendly } from '../PriceFriendly';

const { COLOR } = THEME;

const SummaryBox = ({ caption, value, ...inherit }) => (
  <Col align="center" marginHorizontal="S">
    <Text caption color={COLOR.LIGHTEN} numberOfLines={1}>
      {caption.toUpperCase()}
    </Text>
    <PriceFriendly {...inherit} caption fixed={value >= 1000 ? 0 : undefined} value={value} />
  </Col>
);

SummaryBox.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export { SummaryBox };

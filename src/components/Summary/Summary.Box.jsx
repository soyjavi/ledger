import {
  // helpers
  COLOR,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { PriceFriendly } from '../PriceFriendly';
import { style } from './Summary.style';

const SummaryBox = ({ caption, value, ...inherit }) => (
  <View style={style.summaryBox}>
    <Text color={COLOR.GRAYSCALE_L} detail level={2} numberOfLines={1}>
      {caption.toUpperCase()}
    </Text>
    <PriceFriendly {...inherit} detail level={2} fixed={value >= 1000 ? 0 : undefined} value={value} />
  </View>
);

SummaryBox.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export { SummaryBox };

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
    <Text action color={COLOR.GRAYSCALE_L} level={2} numberOfLines={1} upperCase>
      {caption}
    </Text>
    <PriceFriendly
      {...inherit}
      color={inherit.highlight ? COLOR.PRIMARY : undefined}
      detail
      level={2}
      fixed={value >= 100 ? 0 : undefined}
      value={value}
    />
  </View>
);

SummaryBox.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export { SummaryBox };

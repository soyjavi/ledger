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
import { style } from './HorizontalChartItem.style';

const HorizontalChartItem = ({ color = COLOR.CONTENT, currency, small, title, value, width = 100, ...others }) => (
  <>
    <View style={style.row}>
      <Text detail level={small ? 2 : 1}>
        {title}
      </Text>
      <PriceFriendly detail level={small ? 2 : 1} currency={currency} value={value} />
    </View>

    <View backgroundColor={color} style={[style.bar, small && style.barSmall, { width: `${width}%` }]} />
  </>
);

HorizontalChartItem.propTypes = {
  color: PropTypes.string,
  currency: PropTypes.string,
  small: PropTypes.bool,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
};

export { HorizontalChartItem };

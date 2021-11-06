import {
  // helpers
  COLOR,
  Theme,
  // components
  Text,
  Motion,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions } from 'react-native';

import { PriceFriendly } from '../PriceFriendly';
import { style } from './HorizontalChartItem.style';

const screen = Dimensions.get('window');

const HorizontalChartItem = ({ color = COLOR.CONTENT, currency, small, title, value, width = 100 }) => (
  <>
    <View style={style.row}>
      <Text detail level={small ? 2 : 1}>
        {title}
      </Text>
      <PriceFriendly detail currency={currency} fixed={0} level={small ? 2 : 1} value={value} />
    </View>

    <Motion
      backgroundColor={color}
      style={[style.bar, small && style.barSmall]}
      value={{ width: ((screen.width - Theme.get('spaceM') * 2) * width) / 100 }}
    />
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

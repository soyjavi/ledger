import {
  // helpers
  COLOR,
  // components
  Button,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { style } from './ButtonSummary.style';

const ButtonSummary = ({ color = COLOR.CONTENT, icon, text, onPress }) => (
  <View style={style.container}>
    <Button color={color} icon={icon} outlined rounded squared onPress={onPress} />
    <Text action level={2} style={style.text}>
      {text}
    </Text>
  </View>
);

ButtonSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export { ButtonSummary };

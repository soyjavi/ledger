import { func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from 'reactor/common';
import { Text, Touchable } from 'reactor/components';
import styles from './NumKeyboard.style';

const { COLOR } = THEME;
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'i', 0, 'r'];

const NumKeyboard = ({ onPress }) => (
  <View style={styles.container}>
    { KEYS.map(key => (
      <Touchable
        key={key}
        onPress={key ? () => onPress(key) : undefined}
        raised
        rippleColor={COLOR.BASE}
        style={styles.touchable}
      >
        { typeof key === 'number' && <Text style={styles.key}>{key}</Text> }
      </Touchable>))}
  </View>
);

NumKeyboard.propTypes = {
  onPress: func,
};

NumKeyboard.defaultProps = {
  onPress() {},
};

export default NumKeyboard;

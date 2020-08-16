import { func } from 'prop-types';

import React from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Text, Touchable } from 'reactor/components';

import styles from './NumKeyboard.style';

const { COLOR } = THEME;
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 0, 'b'];

const NumKeyboard = ({ onPress }) => (
  <View style={styles.container}>
    {KEYS.map((key) => (
      <Touchable
        key={key}
        onPress={typeof key === 'number' ? () => onPress(key) : undefined}
        rippleColor={COLOR.TEXT}
        style={styles.touchable}
      >
        <View style={styles.content}>{typeof key === 'number' && <Text subtitle>{key}</Text>}</View>
      </Touchable>
    ))}
  </View>
);

NumKeyboard.propTypes = {
  onPress: func.isRequired,
};

export default NumKeyboard;
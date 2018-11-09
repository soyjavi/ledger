import { func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Text, Touchable } from 'reactor/components';
import styles from './NumKeyboard.style';

const BACKSPACE = ' ←';
const HELP = 'ℹ';
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, HELP, 0, BACKSPACE];

const NumKeyboard = ({ onPress }) => (
  <View style={styles.container}>
    { KEYS.map(key => (
      <Touchable key={key} onPress={() => onPress(key)} raised style={[styles.key]}>
        <Text headline level={5} style={styles.number}>{key}</Text>
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

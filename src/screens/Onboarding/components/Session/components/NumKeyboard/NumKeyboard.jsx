import { func } from 'prop-types';

import React from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Text, Touchable } from 'reactor/components';

import styles from './NumKeyboard.style';

const { COLOR } = THEME;
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, 0, undefined];
const LETTERS = {
  2: 'ABC',
  3: 'DEF',
  4: 'GHI',
  5: 'JKL',
  6: 'MNO',
  7: 'PQRS',
  8: 'TUV',
  9: 'WXYZ',
};

const NumKeyboard = ({ onPress }) => (
  <View style={styles.container}>
    {KEYS.map((key, index) => (
      <Touchable
        key={index}
        onPress={typeof key === 'number' ? () => onPress(key) : undefined}
        style={styles.touchable}
      >
        <View style={styles.content}>
          {typeof key === 'number' && (
            <>
              <Text subtitle>{key}</Text>
              <Text caption color={COLOR.LIGHTEN}>
                {LETTERS[key] || ' '}
              </Text>
            </>
          )}
        </View>
      </Touchable>
    ))}
  </View>
);

NumKeyboard.propTypes = {
  onPress: func.isRequired,
};

export default NumKeyboard;

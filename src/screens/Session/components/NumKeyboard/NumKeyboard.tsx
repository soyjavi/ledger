import React from 'react';
import { View } from 'react-native';

import { Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';

import styles, { KEY_HEIGHT } from './NumKeyboard.style';

const { COLOR } = THEME;
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 0, 'b'];

interface NumKeyboardProps {
  onPress: Function;
};

const NumKeyboard: React.FC<NumKeyboardProps> = ({ onPress }) => (
  <View style={styles.container}>
    { KEYS.map((key: any) => (
      <Touchable
        containerBorderRadius={KEY_HEIGHT / 2}
        key={key}
        onPress={typeof key === 'number' ? () => onPress(key) : undefined}
        raised
        rippleColor={COLOR.PRIMARY}
      >
        <View style={styles.touchable}>
          { typeof key === 'number' && <Text style={styles.key}>{key}</Text> }
        </View>
      </Touchable>
    ))}
  </View>
);

export default NumKeyboard;

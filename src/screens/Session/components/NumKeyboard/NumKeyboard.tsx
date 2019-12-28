import React from 'react';
import { View } from 'react-native';

import { Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';

import { Box } from '../../../../components';
import styles from './NumKeyboard.style';

const { COLOR } = THEME;
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 0, 'b'];

interface NumKeyboardProps {
  onPress: Function;
};

const NumKeyboard: React.FC<NumKeyboardProps> = ({ onPress }) => (
  <View style={styles.container}>
    { KEYS.map((key: any) => (
      <Touchable
        key={key}
        onPress={typeof key === 'number' ? () => onPress(key) : undefined}
        rippleColor={COLOR.PRIMARY}
        style={styles.touchable}
      >
        <View style={styles.content}>
          { typeof key === 'number' && <Text subtitle>{key}</Text> }
        </View>
      </Touchable>
    ))}
  </View>
);

export default NumKeyboard;

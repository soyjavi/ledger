import { func } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';

import styles, { KEY_HEIGHT } from './NumKeyboard.style';

const { COLOR } = THEME;
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 0, 'b'];

const NumKeyboard = ({ onPress }) => (
  <View style={styles.container}>
    { KEYS.map(key => (
      <Touchable
        containerBorderRadius={KEY_HEIGHT / 2}
        key={key}
        onPress={typeof key === 'number' ? () => onPress(key) : undefined}
        raised
        rippleColor={COLOR.PRIMARY}
      >
        <View style={styles.touchable}>
          <Text style={styles.key}>{typeof key === 'number' ? key : ''}</Text>
        </View>
      </Touchable>
    ))}
  </View>
);

NumKeyboard.propTypes = {
  onPress: func,
};

NumKeyboard.defaultProps = {
  onPress() {},
};

export default NumKeyboard;

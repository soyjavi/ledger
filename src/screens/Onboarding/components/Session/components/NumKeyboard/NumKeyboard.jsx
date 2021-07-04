import PropTypes from 'prop-types';
import React from 'react';
import {
  // helpers
  ALIGN,
  COLOR,
  SIZE,
  // components
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';

import { style } from './NumKeyboard.style';

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

const NumKeyboard = ({ onPress, ...others }) => (
  <View {...others} customStyle={style.container} wide>
    {KEYS.map((key, index) => (
      <Touchable
        key={index}
        customStyle={style.touchable}
        paddingVertical={SIZE.S}
        onPress={typeof key === 'number' ? () => onPress(key) : undefined}
      >
        <View alignItems={ALIGN.CENTER}>
          {typeof key === 'number' && (
            <>
              <Text heading level={2}>
                {key}
              </Text>
              <Text detail color={COLOR.GRAYSCALE_XL}>
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
  onPress: PropTypes.func.isRequired,
};

export { NumKeyboard };

import {
  // helpers
  COLOR,
  POINTER,
  Theme,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Keyboard, TextInput } from 'react-native';

import { style } from './Input.style';

const Input = ({ backgroundColor = COLOR.GRAYSCALE_XL, keyboard = 'default', label, value = '', onChange }) => {
  const [focus, setFocus] = useState(false);

  const handleChange = (next = '') => {
    onChange && onChange(next.toString().length > 0 ? next : undefined);
  };

  const active = focus || value.length > 0;

  return (
    <View
      backgroundColor={backgroundColor}
      borderColor={focus ? COLOR.CONTENT : backgroundColor}
      style={style.container}
      wide
    >
      <Text
        color={!active ? COLOR.GRAYSCALE_L : undefined}
        detail
        level={2}
        pointerEvents={POINTER.NONE}
        style={style.label}
        upperCase
      >
        {label}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect
        blurOnSubmit
        editable
        keyboardType={keyboard}
        placeholder={!focus ? 'Type something...' : undefined}
        placeholderTextColor={Theme.get('colorGrayscaleL')}
        style={style.input}
        underlineColorAndroid="transparent"
        value={value}
        onBlur={() => setFocus(false)}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
};

Input.propTypes = {
  backgroundColor: PropTypes.string,
  keyboard: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export { Input };

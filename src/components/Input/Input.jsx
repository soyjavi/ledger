import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import {
  // helpers
  COLOR,
  // components
  Text,
  View,
} from '@lookiero/aurora';

import { style } from './Input.style';

const Input = ({ disabled, keyboard = 'default', label, value = '', onChange, ...others }) => {
  const [focus, setFocus] = useState(false);

  const handleChange = (next = '') => {
    onChange && onChange(next.toString().length > 0 ? next : undefined);
  };

  const active = focus || value.length > 0;

  return (
    <View
      {...others}
      borderColor={active ? COLOR.CONTENT : COLOR.GRAYSCALE_XL}
      customStyle={[style.container, others.customStyle]}
      wide
    >
      <Text color={!active ? COLOR.GRAYSCALE_XL : undefined} customStyle={style.label} detail pointerEvents="none">
        {label.toUpperCase()}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect
        disabled={disabled}
        blurOnSubmit
        editable
        keyboardType={keyboard}
        placeholder={!focus ? 'Type something...' : undefined}
        placeholderTextColor={COLOR.LIGHTEN}
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
  disabled: PropTypes.bool,
  keyboard: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export { Input };

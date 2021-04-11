import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Col, Text } from 'reactor/components';

import styles from './Input.style';

const { COLOR } = THEME;

const Input = ({ color, keyboard = 'default', label, maxLength, onChange, secure, value = '', ...others }) => {
  const [focus, setFocus] = useState(false);

  const handleChange = (next = '') => {
    onChange && onChange(next.toString().length > 0 ? next : undefined);
  };

  const active = focus || value.length > 0;

  return (
    <Col
      {...others}
      style={[
        styles.container,
        active && styles.active,
        active && !focus && styles.fulfilled,
        active && color && { borderColor: color },
        others.style,
      ]}
    >
      <Text bold caption color={!active ? COLOR.LIGHTEN : undefined} pointerEvents="none" style={styles.label}>
        {label.toUpperCase()}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect
        disabled={others.disabled}
        blurOnSubmit
        editable
        keyboardType={keyboard}
        maxLength={maxLength}
        onBlur={() => setFocus(false)}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        onSubmitEditing={Keyboard.dismiss}
        placeholder={!focus ? 'Type something...' : undefined}
        placeholderTextColor={COLOR.LIGHTEN}
        secureTextEntry={secure}
        style={styles.input}
        underlineColorAndroid="transparent"
        value={value}
      />
    </Col>
  );
};

Input.propTypes = {
  color: PropTypes.string,
  keyboard: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  secure: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export { Input };

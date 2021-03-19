import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Col, Text } from 'reactor/components';

import styles from './Input.style';

const { COLOR } = THEME;

const Input = ({ keyboard = 'default', label, maxLength, onChange, secure, ...others }) => {
  const [focus, setFocus] = useState(false);

  const handleChange = (value = '') => {
    let nextValue = value && value.toString().length > 0 ? value : undefined;

    onChange && onChange(nextValue);
  };

  return (
    <Col {...others} style={[styles.container, others.style]}>
      <Text color={focus ? COLOR.TEXT : COLOR.LIGHTEN}>{label.toUpperCase()}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect
        defaultValue={others.defaultValue}
        disabled={others.disabled}
        blurOnSubmit
        editable
        keyboardType={keyboard}
        maxLength={maxLength}
        onBlur={() => setFocus(false)}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        placeholder={!focus ? '...' : undefined}
        placeholderTextColor={COLOR.LIGHTEN}
        secureTextEntry={secure}
        style={[styles.input, focus && styles.inputFocus]}
        underlineColorAndroid="transparent"
        value={others.value || ''}
      />
    </Col>
  );
};

Input.propTypes = {
  keyboard: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  secure: PropTypes.bool,
};

export { Input };

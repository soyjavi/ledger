import {
  // helpers
  COLOR,
  Theme,
  // components
  ButtonIcon,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';

import { L10N } from '@common';

import { style } from './Search.style';

const DELAY_EVENT_SEARCH = 250;

const Search = ({ onChange }) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    const timeout = setTimeout(
      () => onChange(value && value.length > 0 ? value.toLowerCase() : undefined),
      DELAY_EVENT_SEARCH,
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleReset = () => setValue('');

  const hasValue = value && value.trim().length > 0;

  return (
    <KeyboardAvoidingView behavior={Platform.OS !== 'web' ? 'padding' : undefined} style={style.container}>
      <View style={[style.content, (focus || (value && value.length > 0)) && style.focus]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect
          blurOnSubmit
          editable
          placeholder={`${L10N.SEARCH}...`}
          placeholderTextColor={Theme.get('colorGrayscaleL')}
          style={style.input}
          underlineColorAndroid="transparent"
          value={value}
          onBlur={() => setFocus(false)}
          onChangeText={(nextValue) => setValue(nextValue.trim())}
          onFocus={() => setFocus(true)}
        />
        <ButtonIcon
          color={hasValue ? COLOR.CONTENT : COLOR.GRAYSCALE_L}
          name={hasValue ? 'close' : 'search'}
          onPress={hasValue ? handleReset : undefined}
          customStyle={style.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

Search.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { Search };

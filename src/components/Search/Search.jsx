import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

import { useL10N } from '@context';

import styles from './Search.style';

const { COLOR } = THEME;

const DELAY_EVENT_SEARCH = 250;

const Search = ({ onChange }) => {
  const { IS_NATIVE } = useEnvironment();
  const l10n = useL10N();

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

  return (
    <KeyboardAvoidingView behavior={IS_NATIVE ? 'padding' : undefined} style={styles.container}>
      <TextInput
        autoCapitalize="none"
        autoCorrect
        blurOnSubmit
        editable
        placeholder={`${l10n.SEARCH}...`}
        placeholderTextColor={COLOR.LIGHTEN}
        style={[styles.input, (focus || (value && value.length > 0)) && styles.focus]}
        underlineColorAndroid="transparent"
        value={value}
        onBlur={() => setFocus(false)}
        onChangeText={(nextValue) => setValue(nextValue.trim())}
        onFocus={() => setFocus(true)}
      />
    </KeyboardAvoidingView>
  );
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export { Search };

import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Row } from 'reactor/components';
import { useEnvironment } from 'reactor/hooks';

import { useL10N } from '@context';

import styles from './Search.style';

const { COLOR, ICON } = THEME;

const DELAY_EVENT_SEARCH = 250;

const Search = ({ onFocus, onSearch, text, ...others }) => {
  const { IS_NATIVE } = useEnvironment();
  const l10n = useL10N();

  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(
      () => onSearch(value && value.length > 0 ? value.toLowerCase() : undefined),
      DELAY_EVENT_SEARCH,
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handlePress = () => {
    const nextActive = !active;
    if (!nextActive) setValue('');
    setActive(nextActive);
    onFocus(nextActive);
  };

  return (
    <KeyboardAvoidingView behavior={IS_NATIVE ? 'padding' : undefined} style={active ? styles.container : undefined}>
      <Row>
        <Button
          {...others}
          icon="layers"
          iconFamily={ICON.FAMILY}
          onPress={handlePress}
          text={!active ? text : undefined}
        />
        {active && (
          <TextInput
            autoCapitalize="none"
            autoCorrect
            blurOnSubmit
            editable
            onChangeText={(nextValue) => setValue(nextValue.trim())}
            placeholder={`${l10n.SEARCH}...`}
            placeholderTextColor={COLOR.LIGHTEN}
            style={styles.input}
            underlineColorAndroid="transparent"
            value={value}
          />
        )}
      </Row>
    </KeyboardAvoidingView>
  );
};

Search.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export { Search };

import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Col, Row } from 'reactor/components';

import { useL10N, useStore } from '@context';

import { querySearchTxs } from './Search.controller';
import styles from './Search.style';

const { COLOR } = THEME;

export const Search = ({ onValue }) => {
  const l10n = useL10N();
  const store = useStore();

  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(
      () => onValue(value && value.length > 0 ? querySearchTxs(value.toLowerCase(), store, l10n) : undefined),
      250,
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Row marginHorizontal="M" marginBottom="XS" style={[styles.container, focus && styles.focus]}>
      <TextInput
        autoCapitalize="none"
        autoCorrect
        blurOnSubmit
        editable
        onBlur={() => setFocus(false)}
        onChangeText={(nextValue) => setValue(nextValue.trim())}
        onFocus={() => setFocus(true)}
        placeholder={`${l10n.SEARCH}...`}
        placeholderTextColor={COLOR.LIGHTEN}
        style={styles.input}
        underlineColorAndroid="transparent"
        value={value}
      />
      <Col marginLeft="S" width="auto">
        {value.length > 0 && (
          <Button colorText={COLOR.BACKGROUND} onPress={() => setValue('')} size="S" title={l10n.CLEAR} />
        )}
      </Col>
    </Row>
  );
};

Search.propTypes = {
  onValue: PropTypes.func.isRequired,
};

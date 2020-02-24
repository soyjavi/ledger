import { func, string } from 'prop-types';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { THEME } from '../../../../reactor/common';
import { Activity, Icon, Row } from '../../../../reactor/components';
import { useL10N } from '../../../../context';
import styles from './Search.style';

const { COLOR } = THEME;
let TIMEOUT;

const Search = ({ onValue, value }) => {
  const l10n = useL10N();
  const [focus, setFocus] = useState(false);
  const [busy, setBusy] = useState(false);

  const onChangeText = (next) => {
    setBusy(next.length > 0);
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => onValue(next), 300);
    setTimeout(() => setBusy(false), 1000);
  };

  return (
    <Row paddingHorizontal="S" marginBottom="L" marginHorizontal="M" style={[styles.container, focus && styles.focus]}>
      <Icon color={COLOR.LIGHTEN} family="MaterialIcons" marginRight="S" value="search" size={16} />
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        blurOnSubmit
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        placeholder={`${l10n.SEARCH}...`}
        placeholderTextColor={COLOR.LIGHTEN}
        underlineColorAndroid="transparent"
        defaultValue={value}
        style={styles.input}
      />
      {busy && <Activity color={COLOR.LIGHTEN} />}
    </Row>
  );
};

Search.propTypes = {
  onValue: func.isRequired,
  value: string,
};

Search.defaultProps = {
  value: undefined,
};

export default Search;

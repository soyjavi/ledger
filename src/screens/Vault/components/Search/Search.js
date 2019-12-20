import { func, shape, string } from 'prop-types';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import ASSETS from '../../../../assets';
import { THEME } from '../../../../reactor/common';
import { Activity, Icon } from '../../../../reactor/components';
import styles from './Search.style';

const { COLOR } = THEME;
let TIMEOUT;

const Search = ({ l10n, onValue, value }) => {
  const [focus, setFocus] = useState(false);
  const [busy, setBusy] = useState(false);

  const onChangeText = (next) => {
    setBusy(next.length > 0);
    clearTimeout(TIMEOUT);
    TIMEOUT = setTimeout(() => onValue(next), 300);
    setTimeout(() => setBusy(false), 1000);
  };

  return (
    <View style={[styles.container, focus && styles.focus]}>
      <Icon value={ASSETS.search} style={styles.icon} />
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        blurOnSubmit
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        placeholder={`${l10n.SEARCH}...`}
        placeholderTextColor={COLOR.TEXT_LIGHTEN}
        underlineColorAndroid="transparent"
        defaultValue={value}
        style={styles.input}
      />
      { busy && <Activity color={COLOR.TEXT_LIGHTEN} /> }
    </View>
  );
};

Search.propTypes = {
  l10n: shape({}).isRequired,
  onValue: func.isRequired,
  value: string,
};

Search.defaultProps = {
  value: undefined,
};

export default Search;

import { func } from 'prop-types';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { THEME } from '../../../../reactor/common';
import { Activity, Button, Col, Icon, Row } from '../../../../reactor/components';
import { groupTxsByDate, L10N } from '../../../../common';
import { useL10N, useStore } from '../../../../context';
import styles from './Search.style';

const { COLOR } = THEME;
let TIMEOUT;

const querySearchTxs = (next, txs = [], l10n) =>
  groupTxsByDate(
    txs
      .slice()
      .reverse()
      .filter((tx) => {
        const title = tx.title ? tx.title.toLowerCase() : undefined;
        const category = l10n.CATEGORIES[tx.type] ? l10n.CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

        return (title && title.includes(next)) || (category && category.includes(next));
      })
      .slice(0, 16),
  );

export const Search = ({ onValue }) => {
  const l10n = useL10N();
  const { txs = [] } = useStore();

  const [busy, setBusy] = useState(false);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState(undefined);

  const onChangeText = (nextValue) => {
    clearTimeout(TIMEOUT);
    setBusy(nextValue.length > 0);
    setValue(nextValue);

    if (nextValue.length === 0) return onValue();

    TIMEOUT = setTimeout(() => {
      onValue(querySearchTxs(nextValue, txs, l10n));
      setBusy(false);
    }, 250);
  };

  const onReset = () => {
    const nextValue = undefined;
    setValue(nextValue);
    onValue(nextValue);
  };

  console.log({ value });

  return (
    <Row paddingHorizontal="S" marginTop="XS" marginHorizontal="M" style={[styles.container, focus && styles.focus]}>
      <Icon color={COLOR.LIGHTEN} family="MaterialIcons" marginRight="S" value="search" size={16} />
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        blurOnSubmit
        editable={true}
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        placeholder={`${l10n.SEARCH}...`}
        placeholderTextColor={COLOR.LIGHTEN}
        style={styles.input}
        underlineColorAndroid="transparent"
        value={value || ''}
      />
      <Col marginLeft="S" width="auto">
        {busy && <Activity color={COLOR.LIGHTEN} size="XS" />}
        {value && !busy && <Button colorText={COLOR.BACKGROUND} onPress={onReset} size="S" title={l10n.CLEAR} />}
      </Col>
    </Row>
  );
};

Search.propTypes = {
  onValue: func.isRequired,
};

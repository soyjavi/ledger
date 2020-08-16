import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Col, Row } from 'reactor/components';

import { groupTxsByDate } from '@common';
import { useL10N, useStore } from '@context';

import styles from './Search.style';

const { COLOR } = THEME;

const querySearchTxs = (next, { txs = [], vaults = [] }, l10n) =>
  groupTxsByDate(
    txs
      .slice()
      .reverse()
      .filter((tx) => {
        const title = tx.title ? tx.title.toLowerCase() : undefined;
        const category = l10n.CATEGORIES[tx.type] ? l10n.CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

        return (title && title.includes(next)) || (category && category.includes(next));
      })
      .slice(0, 16)
      .map((tx) => {
        const { currency } = vaults.find(({ hash }) => hash === tx.vault);
        return { ...tx, currency };
      }),
  );

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

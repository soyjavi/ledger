import { func, string } from 'prop-types';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { THEME } from '../../../../reactor/common';
import { Activity, Col, Icon, Row } from '../../../../reactor/components';
import { groupTxsByDate } from '../../../../common';
import { useL10N, useStore } from '../../../../context';
import styles from './Search.style';

const { COLOR } = THEME;
let TIMEOUT;

const querySearchTxs = (next, txs = [], l10n) =>
  groupTxsByDate(
    txs
      .reverse()
      .filter((tx) => {
        const title = tx.title ? tx.title.toLowerCase() : undefined;
        const category = l10n.CATEGORIES[tx.type] ? l10n.CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

        return (title && title.includes(next)) || (category && category.includes(next));
      })
      .slice(0, 16),
  );

export const Search = ({ onValue, value }) => {
  const l10n = useL10N();
  const { txs = [] } = useStore();

  const [focus, setFocus] = useState(false);
  const [busy, setBusy] = useState(false);

  const onChangeText = (next) => {
    clearTimeout(TIMEOUT);
    setBusy(next.length > 0);

    if (next.length === 0) return onValue();

    setBusy(next.length > 0);
    TIMEOUT = setTimeout(() => {
      onValue(querySearchTxs(next, txs, l10n));
      setBusy(false);
    }, 250);
  };

  return (
    <Row paddingHorizontal="S" marginTop="XS" marginHorizontal="M" style={[styles.container, focus && styles.focus]}>
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
      <Col marginLeft="S" width="auto">
        {busy && <Activity color={COLOR.LIGHTEN} size="XS" />}
      </Col>
    </Row>
  );
};

Search.propTypes = {
  onValue: func.isRequired,
  value: string,
};

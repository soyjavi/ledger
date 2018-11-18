import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { Price, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { verboseDate } from './modules';
import styles from './TransactionItem.style';

const {
  COLORS, SCREEN, SYMBOL, TX: { TYPE: { EXPENSE } },
} = C;
const { COLOR } = THEME;

const TransactionItem = (props) => {
  const {
    category, currency, hash, timestamp, value, title, type, vault, ...inherit
  } = props;
  const isHeading = !hash;
  const isBottom = inherit.last;

  return (
    <Consumer>
      { ({ l10n, navigation: { navigate } }) => (
        <Touchable
          rippleColor={COLOR.PRIMARY}
          style={[styles.container, isHeading && styles.heading]}
          onPress={hash ? () => navigate(SCREEN.TRANSACTION, props) : undefined}
        >
          <View style={[styles.line, isHeading && styles.lineHeading, isBottom && styles.lineBottom]} />
          <View style={[styles.bullet, hash && COLORS[category] && { backgroundColor: COLORS[category] }]} />
          <View style={styles.texts}>
            { hash
              ? <Text headline level={6} numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
              : <Text subtitle level={3} lighten>{verboseDate(timestamp, l10n)}</Text>}

            { title && <Text level={2} lighten numberOfLines={1}>{title}</Text> }
          </View>
          { value && (
            <Price
              caption={type === EXPENSE ? undefined : '+'}
              value={parseFloat(value, 10)}
              fixed={2}
              symbol={SYMBOL[currency]}
            />)}
        </Touchable>
      )}
    </Consumer>
  );
};

TransactionItem.propTypes = {
  category: number,
  currency: string,
  hash: string,
  timestamp: string.isRequired,
  title: string,
  type: number,
  value: number,
  vault: string,
};

TransactionItem.defaultProps = {
  category: undefined,
  currency: undefined,
  hash: undefined,
  title: undefined,
  type: undefined,
  value: undefined,
  vault: undefined,
};

export default TransactionItem;

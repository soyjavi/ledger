import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { Price, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import BulletPrice from '../BulletPrice';
import { verboseDate } from './modules';
import styles from './TransactionItem.style';

const {
  COLORS, FIXED, SCREEN, SYMBOL, TX: { TYPE: { EXPENSE } },
} = C;
const { COLOR } = THEME;

const TransactionItem = (props) => {
  const {
    category, currency, hash, timestamp, value, title, type, vault, ...inherit
  } = props;
  const isHeading = !hash;
  const isBottom = inherit.last;
  const { incomes, expenses } = inherit.cashflow || {};
  const priceProps = {
    fixed: FIXED[currency], lighten: true, level: 2, subtitle: true, symbol: SYMBOL[currency],
  };

  return (
    <Consumer>
      { ({ l10n, navigation: { navigate } }) => (
        <Touchable
          rippleColor={COLOR.PRIMARY}
          onPress={hash ? () => navigate(SCREEN.TRANSACTION, props) : undefined}
        >
          <View style={[styles.container, isHeading && styles.heading]}>
            <View style={[styles.line, isHeading && styles.lineHeading, isBottom && styles.lineBottom]} />
            <View style={[styles.bullet, hash && COLORS[category] && { backgroundColor: COLORS[category] }]} />
            <View style={styles.texts}>
              { hash
                ? <Text headline level={6} numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
                : <Text subtitle level={3} lighten>{verboseDate(timestamp, l10n)}</Text>}

              { title && <Text level={2} lighten numberOfLines={1}>{title}</Text> }
            </View>
            { (incomes || expenses) && (
              <View style={styles.cashflow}>
                { incomes !== 0 && <BulletPrice income {...priceProps} value={incomes} /> }
                { expenses !== 0 && <BulletPrice {...priceProps} value={expenses} /> }
              </View>
            )}
            { value && <Price {...priceProps} title={type === EXPENSE ? undefined : '+'} value={value} /> }
          </View>
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

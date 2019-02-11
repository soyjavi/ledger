import { func, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { Price, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import formatTime from './modules/formatTime';
import styles from './TransactionItem.style';

const { FIXED, SYMBOL, TX: { TYPE: { INCOME } } } = C;
const { COLOR } = THEME;

const TransactionItem = ({
  category, currency, hash, onPress, timestamp, title, type, value,
}) => (
  <Consumer>
    { ({ store: { baseCurrency, rates }, l10n }) => (
      <Touchable key={hash} rippleColor={COLOR.TEXT_LIGHTEN} onPress={onPress}>
        <View style={styles.container}>
          <Text caption lighten style={styles.timestamp}>{formatTime(new Date(timestamp))}</Text>
          <View style={styles.texts}>
            { title && <Text subtitle level={2} numberOfLines={1}>{title}</Text> }
            <Text caption lighten numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
          </View>
          <View style={styles.prices}>
            <Price
              subtitle
              level={2}
              fixed={FIXED[baseCurrency]}
              symbol={SYMBOL[baseCurrency]}
              title={type === INCOME ? '+' : undefined}
              value={baseCurrency !== currency
                ? exchange(Math.abs(value), currency, baseCurrency, rates)
                : Math.abs(value)}
            />

            { baseCurrency !== currency && (
              <Price
                caption
                lighten
                fixed={FIXED[currency]}
                symbol={SYMBOL[currency]}
                title={type === INCOME ? '+' : undefined}
                value={value}
              />)}
          </View>
        </View>
      </Touchable>
    )}
  </Consumer>
);

TransactionItem.propTypes = {
  category: number.isRequired,
  currency: string.isRequired,
  hash: string.isRequired,
  onPress: func.isRequired,
  timestamp: string.isRequired,
  title: string,
  type: number.isRequired,
  value: number.isRequired,
};

TransactionItem.defaultProps = {
  title: undefined,
};

export default TransactionItem;

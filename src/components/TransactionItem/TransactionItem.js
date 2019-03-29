import {
  func, number, shape, string,
} from 'prop-types';
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
  category, currency, hash, location, onPress, timestamp, title, type, value,
}) => (
  <Consumer>
    { ({ store: { baseCurrency, rates }, l10n }) => (
      <Touchable key={hash} rippleColor={COLOR.TEXT_LIGHTEN} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Text caption lighten numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
          </View>
          <View style={styles.texts}>
            { title && <Text subtitle level={1} numberOfLines={1}>{title}</Text> }
            { location && location.place && <Text caption lighten>{location.place}</Text> }
            <Text caption lighten>{formatTime(new Date(timestamp))}</Text>
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
              />
            )}
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
  location: shape({}),
  onPress: func.isRequired,
  timestamp: string.isRequired,
  title: string,
  type: number.isRequired,
  value: number.isRequired,
};

TransactionItem.defaultProps = {
  location: undefined,
  title: undefined,
};

export default TransactionItem;

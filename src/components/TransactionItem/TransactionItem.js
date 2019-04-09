import {
  func, number, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C, exchange } from '../../common';
import { ConsumerStore } from '../../context';
import {
  Icon, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import formatCaption from './modules/formatCaption';
import styles from './TransactionItem.style';

const { FIXED, SYMBOL, TX: { TYPE: { INCOME } } } = C;
const { COLOR } = THEME;

const TransactionItem = ({
  category, currency, hash, location, onPress, timestamp, title, type, value,
}) => (
  <ConsumerStore>
    { ({ baseCurrency, rates }) => (
      <Touchable key={hash} rippleColor={COLOR.TEXT_LIGHTEN} onPress={onPress}>
        <View style={[styles.container, styles.row]}>
          <View style={styles.icon}>
            <Icon value="doneContrast" />
          </View>
          <View style={[styles.content, styles.row]}>
            <View style={styles.texts}>
              { title && <Text subtitle level={2} numberOfLines={1}>{title}</Text> }
              <Text caption lighten>{formatCaption(new Date(timestamp), location)}</Text>
            </View>
            <View style={styles.prices}>
              <Price
                subtitle
                level={2}
                fixed={FIXED[baseCurrency]}
                symbol={SYMBOL[baseCurrency]}
                title={type === INCOME ? '+' : '-'}
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
                  title={type === INCOME ? '+' : '-'}
                  value={value}
                />
              )}
            </View>
          </View>
        </View>
      </Touchable>
    )}
  </ConsumerStore>
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

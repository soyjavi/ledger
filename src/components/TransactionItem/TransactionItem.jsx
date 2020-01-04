import { MaterialCommunityIcons } from '@expo/vector-icons';
import { number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Text, Touchable } from '../../reactor/components';

import { C, exchange, getIconCategory } from '../../common';
import { useNavigation, useStore } from '../../context';
import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import { formatCaption } from './modules';
import styles from './TransactionItem.style';

const {
  VAULT_TRANSFER,
  TX: {
    TYPE: { INCOME, EXPENSE },
  },
} = C;
const { COLOR } = THEME;

const TransactionItem = (props) => {
  const { baseCurrency, rates } = useStore();
  const { showTx } = useNavigation();
  const { category, currency, location, timestamp, title, type, value } = props;
  const operator = type === EXPENSE ? -1 : 1;

  let color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;
  if (category === VAULT_TRANSFER) color = COLOR.TRANSFER;

  return (
    <Touchable rippleColor={COLOR.TEXT_LIGHTEN} onPress={() => showTx(props)}>
      <View style={[styles.container, styles.row]}>
        <Box color={color} opacity={0.25} small style={styles.box}>
          <MaterialCommunityIcons
            name={getIconCategory({ type, category, title })}
            color={color}
            size={20}
            style={styles.icon}
          />
        </Box>

        <View style={[styles.content, styles.row]}>
          <View style={styles.texts}>
            {title && (
              <Text color={COLOR.TEXT_CONTRAST} bold numberOfLines={1}>
                {title}
              </Text>
            )}
            <Text caption lighten>
              {formatCaption(new Date(timestamp), location)}
            </Text>
          </View>
          <View style={styles.prices}>
            <PriceFriendly
              color={COLOR.TEXT_CONTRAST}
              currency={baseCurrency}
              operator={type === INCOME}
              value={exchange(value, currency, baseCurrency, rates, timestamp) * operator}
            />

            {baseCurrency !== currency && (
              <PriceFriendly
                caption
                color={COLOR.TEXT_LIGHTEN}
                currency={currency}
                operator={type === INCOME}
                value={value * operator}
                style={styles.caption}
              />
            )}
          </View>
        </View>
      </View>
    </Touchable>
  );
};

TransactionItem.propTypes = {
  category: number.isRequired,
  currency: string.isRequired,
  location: shape({}),
  timestamp: oneOfType([string, number]).isRequired,
  title: string,
  type: number,
  value: number.isRequired,
};

TransactionItem.defaultProps = {
  location: undefined,
  title: undefined,
  type: EXPENSE,
};

export { TransactionItem };

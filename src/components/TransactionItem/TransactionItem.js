import {
  number, oneOfType, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Icon, Text, Touchable } from '../../reactor/components';

import { C, exchange, getIconCategory } from '../../common';
import { useStore } from '../../context';
import Box from '../Box';
import PriceFriendly from '../PriceFriendly';
import { formatCaption } from './modules';
import styles from './TransactionItem.style';

const { VAULT_TRANSFER, TX: { TYPE: { INCOME, EXPENSE, TRANSFER } } } = C;
const { COLOR } = THEME;

const TransactionItem = (props) => {
  const { baseCurrency, onSelectTx, rates } = useStore();
  const {
    category, currency, location, timestamp, title, type, value,
  } = props;
  const isVaultTransfer = category === VAULT_TRANSFER;
  const operator = type === EXPENSE ? -1 : 1;

  return (
    <Touchable rippleColor={COLOR.TEXT_LIGHTEN} onPress={() => onSelectTx(props)}>
      <View style={[styles.container, styles.row, isVaultTransfer && styles.containerHighlight]}>
        <Box style={styles.icon}>
          <Icon value={getIconCategory({ type, category, title })} />
        </Box>

        <View style={[styles.content, styles.row]}>
          <View style={styles.texts}>
            { title && <Text color={COLOR.TEXT_CONTRAST} bold numberOfLines={1}>{title}</Text> }
            <Text caption lighten style={styles.caption}>
              {formatCaption(new Date(timestamp), location)}
            </Text>
          </View>
          <View style={styles.prices}>
            <PriceFriendly
              bold
              color={COLOR.TEXT_CONTRAST}
              currency={baseCurrency}
              operator={type === INCOME}
              value={exchange(value, currency, baseCurrency, rates, timestamp) * operator}
            />

            { baseCurrency !== currency && (
              <PriceFriendly
                caption
                currency={currency}
                lighten
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
  type: number.isRequired,
  value: number.isRequired,
};

TransactionItem.defaultProps = {
  location: undefined,
  title: undefined,
};

export default TransactionItem;

import { number, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Icon, Text, Touchable } from '../../reactor/components';

import { C, exchange, getIconCategory } from '../../common';
import { Consumer } from '../../context';
import Box from '../Box';
import PriceFriendly from '../PriceFriendly';
import { formatCaption } from './modules';
import styles from './TransactionItem.style';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, TRANSFER } } } = C;
const { COLOR } = THEME;

const TransactionItem = ({
  category, currency, location, timestamp, title, type, value,
}) => {
  const isVaultTransfer = category === VAULT_TRANSFER;
  const operator = type === EXPENSE ? -1 : 1;

  return (
    <Consumer>
      { ({ store: { baseCurrency, onSelectTx, rates } }) => (
        <Touchable rippleColor={COLOR.TEXT_LIGHTEN} onPress={() => onSelectTx(this.props)}>
          <View style={[styles.container, styles.row, isVaultTransfer && styles.containerHighlight]}>
            <Box style={styles.icon}>
              <Icon value={getIconCategory({ type, category, title })} />
            </Box>

            <View style={[styles.content, styles.row]}>
              <View style={styles.texts}>
                { title && <Text subtitle level={3} lighten={isVaultTransfer} numberOfLines={1}>{title}</Text> }
                <Text caption level={2} lighten style={styles.caption}>
                  {formatCaption(new Date(timestamp), location)}
                </Text>
              </View>
              <View style={styles.prices}>
                <PriceFriendly
                  currency={baseCurrency}
                  subtitle
                  level={3}
                  lighten={isVaultTransfer}
                  operator={type !== TRANSFER}
                  value={exchange(value, currency, baseCurrency, rates, timestamp) * operator}
                />

                { baseCurrency !== currency && (
                  <PriceFriendly
                    caption
                    currency={currency}
                    level={2}
                    lighten
                    operator={type !== TRANSFER}
                    value={value * operator}
                    style={styles.caption}
                  />
                )}
              </View>
            </View>
          </View>
        </Touchable>
      )}
    </Consumer>
  );
};

TransactionItem.propTypes = {
  category: number.isRequired,
  currency: string.isRequired,
  location: shape({}),
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

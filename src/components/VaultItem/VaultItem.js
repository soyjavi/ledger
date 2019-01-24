import { func, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Price, Text, Touchable } from '../../reactor/components';
import styles from './VaultItem.style';

const { FIXED, SYMBOL } = C;

const VaultItem = (props) => {
  const {
    color, currency, onPress, currentBalance, title,
  } = props;
  const priceProps = { fixed: FIXED[currency], symbol: SYMBOL[currency], style: styles.text };

  return (
    <Touchable onPress={onPress} rippleColor={color} style={[styles.container]}>
      <View>
        <View style={styles.background}>
          <Price {...priceProps} color={color} headline level={2} value={currentBalance} />
        </View>
        <View style={[styles.row]}>
          <View style={styles.info}>
            <Text subtitle level={3} numberOfLines={1} color={color} style={styles.text}>{title}</Text>
            <Price {...priceProps} headline level={5} value={currentBalance} />
          </View>
        </View>
      </View>
    </Touchable>
  );
};

VaultItem.propTypes = {
  color: string,
  currency: string.isRequired,
  onPress: func.isRequired,
  currentBalance: number.isRequired,
  title: string.isRequired,
};

VaultItem.defaultProps = {
  color: undefined,
};

export default VaultItem;

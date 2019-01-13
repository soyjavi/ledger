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

  return (
    <Touchable rippleColor={color} onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.bullet, { backgroundColor: color }]} />
        <View style={styles.info}>
          <Text subtitle level={2} numberOfLines={1}>{title}</Text>
          <Text caption lighten numberOfLines={1}>{title}</Text>
        </View>
        <Price
          fixed={FIXED[currency]}
          subtitle
          level={2}
          value={currentBalance}
          symbol={SYMBOL[currency]}
        />
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

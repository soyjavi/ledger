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
        <View style={styles.info}>
          <Text subtitle level={1} numberOfLines={1}>{title}</Text>
          <Price
            fixed={FIXED[currency]}
            headline
            level={6}
            lighten
            value={currentBalance}
            symbol={SYMBOL[currency]}
          />
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

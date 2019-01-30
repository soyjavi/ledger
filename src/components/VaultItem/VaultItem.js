import { func, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Price, Text, Touchable } from '../../reactor/components';
import Thumbnail from '../Thumbnail';
import styles from './VaultItem.style';

const { FIXED, SYMBOL } = C;

const VaultItem = (props) => {
  const {
    color, currency, onPress, currentBalance, title,
  } = props;

  return (
    <Touchable onPress={onPress} rippleColor={color} style={styles.container}>
      <View style={styles.row}>
        <Thumbnail color={color} title={title.substring(0, 2).trim().toUpperCase()} small />
        <View style={styles.content}>
          <Text subtitle level={2} numberOfLines={1}>{title}</Text>
        </View>
        <Price fixed={FIXED[currency]} symbol={SYMBOL[currency]} headline level={6} value={currentBalance} />
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

import { func, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import {
  Icon, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import styles from './VaultItem.style';

const { iconExpense, iconIncome } = ASSETS;
const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

// progression: balance > 0 ? (progression * 100) / (balance - progression) : undefined,

const VaultItem = (props) => {
  const {
    currency, onPress, currentBalance, progression, title,
  } = props;

  return (
    <Touchable onPress={onPress} rippleColor={COLOR.PRIMARY} style={styles.container}>
      <View>
        <Text caption numberOfLines={1}>{title.toUpperCase()}</Text>
        <Price fixed={FIXED[currency]} symbol={SYMBOL[currency]} headline level={5} value={currentBalance} />
        <View style={styles.progression}>
          { progression
            ? (
              <View style={styles.row}>
                <Icon value={progression > 0 ? iconIncome : iconExpense} />
                <Price
                  fixed={2}
                  caption
                  color={progression > 0 ? COLOR.INCOMES : COLOR.EXPENSES}
                  symbol="%"
                  value={Math.abs((progression * 100) / (currentBalance - progression))}
                />
                <View style={styles.separator} />
                <Price
                  caption
                  fixed={FIXED[currency]}
                  lighten
                  style={styles.progressionValue}
                  symbol={SYMBOL[currency]}
                  value={progression}
                />
              </View>)
            : <Text caption lighten>$No transaction</Text>
          }
        </View>
      </View>
    </Touchable>
  );
};

VaultItem.propTypes = {
  currency: string.isRequired,
  onPress: func.isRequired,
  currentBalance: number.isRequired,
  progression: number,
  title: string.isRequired,
};

VaultItem.defaultProps = {
  progression: undefined,
};

export default VaultItem;

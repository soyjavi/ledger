import {
  arrayOf, func, number, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Price, Text, Touchable } from '../../reactor/components';
import Chart from '../Chart';
import styles from './VaultItem.style';

const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

const VaultItem = (props) => {
  const {
    balance, cashflow: { income, expenses } = {}, chart, color, currency, onPress, title,
  } = props;

  return (
    <Consumer>
      { ({ l10n }) => (
        <Touchable rippleColor={COLOR.PRIMARY} onPress={onPress}>
          <View style={styles.container}>
            <View style={[styles.bullet, color && { backgroundColor: color }]} />
            <View style={styles.content}>
              <Text headline level={5} numberOfLines={1}>{title}</Text>
              <View style={styles.summary}>
                <View style={styles.texts}>
                  <Text level={2} lighten numberOfLines={1}>{l10n.BALANCE}</Text>
                  <Price
                    fixed={FIXED[currency]}
                    subtitle
                    level={2}
                    lighten
                    value={balance + income - expenses}
                    symbol={SYMBOL[currency]}
                  />
                </View>
                <Chart color={color} values={chart} />
              </View>
            </View>
          </View>
        </Touchable>
      )}
    </Consumer>
  );
};

VaultItem.propTypes = {
  balance: number.isRequired,
  cashflow: shape({}),
  chart: arrayOf(number),
  color: string,
  currency: string.isRequired,
  onPress: func.isRequired,
  title: string.isRequired,
};

VaultItem.defaultProps = {
  cashflow: undefined,
  chart: undefined,
  color: undefined,
};

export default VaultItem;

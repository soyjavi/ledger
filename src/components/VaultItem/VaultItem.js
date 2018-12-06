import {
  arrayOf, func, number, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { Price, Text, Touchable } from '../../reactor/components';
import Chart from '../Chart';
import styles from './VaultItem.style';

const { FIXED, SYMBOL } = C;

const VaultItem = (props) => {
  const {
    chart, color, currency, onPress, overallBalance, title,
  } = props;

  return (
    <Consumer>
      { ({ l10n }) => (
        <Touchable rippleColor={color} onPress={onPress}>
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
                    level={1}
                    lighten
                    value={overallBalance}
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
  chart: arrayOf(number).isRequired,
  color: string,
  currency: string.isRequired,
  onPress: func.isRequired,
  overallBalance: number.isRequired,
  title: string.isRequired,
};

VaultItem.defaultProps = {
  color: undefined,
};

export default VaultItem;

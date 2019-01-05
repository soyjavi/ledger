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
    balance, chart, color, currency, onPress, overallBalance, title,
  } = props;

  return (
    <Consumer>
      { ({ l10n }) => (
        <Touchable rippleColor={color} onPress={onPress} style={styles.container}>
          <View style={styles.content}>
            <View style={styles.info}>
              <Text headline level={5} numberOfLines={1} style={styles.title}>{title}</Text>
              <Text caption lighten numberOfLines={1}>{l10n.BALANCE}</Text>
              <Price
                fixed={FIXED[currency]}
                headline
                level={5}
                lighten
                value={overallBalance}
                symbol={SYMBOL[currency]}
              />
            </View>
            <Chart color={color} inheritValue={balance} values={chart} />
          </View>
        </Touchable>
      )}
    </Consumer>

  );
};

VaultItem.propTypes = {
  balance: number.isRequired,
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

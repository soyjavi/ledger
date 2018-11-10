import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Consumer } from 'context';
import { THEME } from 'reactor/common';
import { Price, Text, Touchable } from 'reactor/components';
import Chart from '../Chart';
import styles from './VaultItem.style';

const { COLOR } = THEME;

const VaultItem = (props) => {
  const {
    balance, color, currency, title,
  } = props;

  return (
    <Consumer>
      { ({ navigation: { navigate }, l10n }) => (
        <Touchable rippleColor={COLOR.BASE} style={styles.container} onPress={() => navigate('vault', props)}>
          <View style={[styles.bullet, color && { backgroundColor: color }]} />
          <View style={styles.content}>
            <Text headline level={5} numberOfLines={1}>{title}</Text>
            <View style={styles.summary}>
              <View style={styles.texts}>
                <Text level={2} lighten numberOfLines={1}>{l10n.BALANCE}</Text>
                <Price headline={false} subtitle level={2} lighten value={balance} symbol={currency} />
              </View>
              <Chart color={color} />
            </View>
          </View>
        </Touchable>
      )}
    </Consumer>
  );
};

VaultItem.propTypes = {
  balance: number,
  color: string,
  currency: string,
  title: string,
};

VaultItem.defaultProps = {
  balance: undefined,
  color: undefined,
  currency: undefined,
  title: undefined,
};

export default VaultItem;

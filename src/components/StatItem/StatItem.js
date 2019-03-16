import { func, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Consumer } from '../../context';
import { Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import PriceFriendly from '../PriceFriendly';
import styles from './StatItem.style';

const { COLOR } = THEME;

const StatItem = ({
  category, onPress, type, value,
}) => {
  const days = (new Date()).getDate();

  return (
    <Consumer>
      { ({ store: { baseCurrency }, l10n }) => (
        <Touchable onPress={onPress} rippleColor={COLOR.TEXT_LIGHTEN} style={styles.container}>
          <View>
            <Text caption level={2} numberOfLines={1}>
              {l10n.CATEGORIES[type][category].toUpperCase()}
            </Text>
            <PriceFriendly headline level={5} currency={baseCurrency} value={value} />

            <View style={styles.row}>
              <PriceFriendly subtitle level={3} lighten fixed={0} currency={baseCurrency} value={value / days} />
              <Text level={3} lighten>{` / ${l10n.DAY}`}</Text>
            </View>
          </View>
        </Touchable>
      )}
    </Consumer>
  );
};

StatItem.propTypes = {
  category: string.isRequired,
  onPress: func.isRequired,
  type: number.isRequired,
  value: number.isRequired,
};

export default StatItem;

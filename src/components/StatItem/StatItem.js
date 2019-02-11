import { number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Consumer } from '../../context';
import { Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import PriceFriendly from '../PriceFriendly';
import styles from './StatItem.style';

const { COLOR } = THEME;

const StatItem = ({ category, type, value }) => (
  <Consumer>
    { ({ store: { baseCurrency }, l10n: { CATEGORIES } }) => (
      <Touchable onPress={() => {}} rippleColor={COLOR.TEXT_LIGHTEN} style={styles.container}>
        <View>
          <Text caption level={2} numberOfLines={1}>
            {CATEGORIES[type][category].toUpperCase()}
          </Text>
          <PriceFriendly headline level={5} currency={baseCurrency} value={value} />
        </View>
      </Touchable>
    )}
  </Consumer>
);

StatItem.propTypes = {
  category: string.isRequired,
  type: number.isRequired,
  value: number.isRequired,
};

export default StatItem;

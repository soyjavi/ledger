import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { Icon, Price } from '../../reactor/components';
import styles from './BulletPrice.style';

const { FIXED, SYMBOL } = C;
const { iconExpenseTrend, iconIncomeTrend } = ASSETS;

const BulletPrice = ({
  currency, incomes, value, ...inherit
}) => (
  <View style={[styles.container, inherit.style]}>
    <Icon value={incomes ? iconIncomeTrend : iconExpenseTrend} style={styles.icon} />
    <Price
      color={inherit.color}
      fixed={FIXED[currency]}
      level={2}
      lighten
      subtitle
      symbol={SYMBOL[currency]}
      title={incomes ? '+' : undefined}
      value={value}
    />
  </View>
);

BulletPrice.propTypes = {
  currency: string,
  incomes: bool,
  value: number,
};

BulletPrice.defaultProps = {
  currency: undefined,
  incomes: false,
  value: 0,
};

export default BulletPrice;

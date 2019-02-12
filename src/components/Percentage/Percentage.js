import { number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { LAYOUT, THEME } from '../../reactor/common';
import { Icon, Price } from '../../reactor/components';
import styles from './Percentage.style';

const { COLOR } = THEME;

const PriceFriendly = ({ currency, value, ...inherit }) => (
  <View style={LAYOUT.STYLE.ROW}>
    <Icon value={value > 0 ? ASSETS.iconIncome : ASSETS.iconExpense} style={styles.icon} />
    <Price
      fixed={Math.abs(value) < 1 ? 2 : 0}
      color={value > 0 ? COLOR.INCOMES : COLOR.EXPENSES}
      symbol="%"
      value={Math.abs(value)}
      {...inherit}
    />
  </View>
);

PriceFriendly.propTypes = {
  value: number,
};

PriceFriendly.defaultProps = {
  value: 0,
};

export default PriceFriendly;

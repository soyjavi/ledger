import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Icon, Price, Text } from '../../reactor/components';
import { format } from '../../reactor/components/Price/modules';

import ASSETS from '../../assets';
import { C } from '../../common';
import styles from './PriceFriendly.style';

const { COLOR } = THEME;
const { FIXED, SYMBOL } = C;
const maskValue = props => format({ ...props, operator: undefined }).replace(/[0-9]/gi, '*');

const PriceFriendly = ({
  currency, icon, mask, value = 0, ...inherit
}) => {
  let color;
  let operator;

  if (icon) color = value > 0 ? COLOR.INCOMES : COLOR.EXPENSES;
  if (inherit.operator && value > 0) operator = '+';
  else if (inherit.operator && value < 0) operator = '-';

  const props = {
    ...inherit,
    color,
    fixed: value < 1000 ? FIXED[currency] || 2 : 0,
    operator,
    symbol: SYMBOL[currency] || currency,
    value: Math.abs(value),
  };

  return (
    <View style={styles.container}>
      { icon && !mask && Math.abs(value) > 0 && (
        <Icon value={value > 0 ? ASSETS.income : ASSETS.expense} style={styles.icon} />
      )}
      {mask ? <Text {...inherit}>{maskValue(props)}</Text> : <Price {...props} />}
    </View>
  );
};

PriceFriendly.propTypes = {
  currency: string,
  icon: bool,
  mask: bool,
  operator: bool,
  value: number,
};

PriceFriendly.defaultProps = {
  currency: undefined,
  icon: false,
  mask: false,
  operator: false,
  value: 0,
};

export default PriceFriendly;

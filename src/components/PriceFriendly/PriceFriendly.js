import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Price, Text } from '../../reactor/components';
import { format } from '../../reactor/components/Price/modules';

import { C, currencyDecimals } from '../../common';
import { useSettings } from '../../context';
import styles from './PriceFriendly.style';

const { COLOR } = THEME;
const { SYMBOL } = C;
const maskValue = (props) => format({ ...props, operator: undefined }).replace(/[0-9]/gi, '#');

const PriceFriendly = ({
  currency, label, operator, value = 0, ...inherit
}) => {
  const { state: { maskAmount } } = useSettings();
  let { color } = inherit;
  let operatorEnhanced;

  if (operator && !color && !maskAmount) {
    if (value === 0) color = COLOR.TEXT_LIGHTEN;
    else color = value > 0 ? COLOR.INCOME : COLOR.EXPENSE;
  }
  if (operator && value > 0) operatorEnhanced = '+';
  else if (operator && value < 0) operatorEnhanced = '-';

  const props = {
    ...inherit,
    color,
    fixed: currencyDecimals(value, currency),
    numberOfLines: 1,
    operator: operatorEnhanced,
    symbol: SYMBOL[currency] || currency,
    value: Math.abs(value),
  };

  const style = [styles.font, inherit.style];

  return (
    <View style={styles.container}>
      { label && <Text color={color} {...inherit}>{label}</Text> }
      { maskAmount
        ? <Text {...inherit} color={color} style={style}>{maskValue(props)}</Text>
        : <Price {...props} style={style} />}
    </View>
  );
};

PriceFriendly.propTypes = {
  currency: string,
  label: string,
  operator: bool,
  value: number,
};

PriceFriendly.defaultProps = {
  currency: undefined,
  label: undefined,
  operator: false,
  value: 0,
};

export { PriceFriendly };

import { bool, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Icon, Price, Text } from '../../reactor/components';
import { format } from '../../reactor/components/Price/modules';

import ASSETS from '../../assets';
import { C, currencyDecimals } from '../../common';
import { Consumer } from '../../context';
import styles from './PriceFriendly.style';

const { COLOR } = THEME;
const { SYMBOL, SETTINGS: { HIDE_OVERALL_BALANCE } } = C;
const maskValue = (props) => format({ ...props, operator: undefined }).replace(/[0-9]/gi, '#');

const PriceFriendly = ({
  currency, icon, label, value = 0, ...inherit
}) => {
  let color;
  let operator;

  if (icon) {
    if (value === 0) color = COLOR.TEXT_LIGHTEN;
    else color = value > 0 ? COLOR.INCOME : COLOR.EXPENSE;
  }
  if (inherit.operator && value > 0) operator = '+';
  else if (inherit.operator && value < 0) operator = '-';

  const props = {
    ...inherit,
    color,
    fixed: currencyDecimals(value, currency),
    operator,
    symbol: SYMBOL[currency] || currency,
    value: Math.abs(value),
  };

  return (
    <Consumer>
      { ({
        store: { settings: { [HIDE_OVERALL_BALANCE]: mask } },
      }) => (
        <View style={styles.container}>
          { label && <Text color={color} {...inherit}>{label}</Text> }
          { icon && !mask && Math.abs(value) > 0 && (
            <Icon value={value > 0 ? ASSETS.income : ASSETS.expense} style={styles.icon} />
          )}
          {mask ? <Text color={color} {...inherit}>{maskValue(props)}</Text> : <Price {...props} />}
        </View>
      )}
    </Consumer>
  );
};

PriceFriendly.propTypes = {
  currency: string,
  icon: bool,
  label: string,
  operator: bool,
  value: number,
};

PriceFriendly.defaultProps = {
  currency: undefined,
  icon: false,
  label: undefined,
  operator: false,
  value: 0,
};

export default PriceFriendly;

import { shape, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Icon, Price, Text } from '../../reactor/components';
import Chart from '../Chart';
import styles from './BalanceCard.style';

const { iconExpense, iconIncome } = ASSETS;
const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

const BalanceCard = ({
  chart, color, currency, progression = 0, title, value, ...inherit
}) => {
  const priceProps = { fixed: FIXED[currency], symbol: SYMBOL[currency], style: styles.text };

  return (
    <Consumer>
      { ({ l10n }) => (
        <View style={[styles.container, inherit.style, { backgroundColor: color, shadowColor: color }]}>
          <View style={styles.background}>
            <Price {...priceProps} headline level={2} value={value} />
          </View>
          <View style={styles.summary}>
            <View>
              <Text caption style={[styles.text, styles.caption]}>{title}</Text>
              <Price {...priceProps} headline level={4} value={value} />
            </View>
          </View>
          <View style={styles.row}>
            <Text caption style={[styles.text, styles.caption]}>{l10n.LAST_6_MONTHS}</Text>
            <Text caption level={2} style={[styles.text, styles.ruler]}>{l10n.BALANCE.toLowerCase()}</Text>
          </View>
          <Chart color={COLOR.WHITE} {...chart} />
          <View style={styles.row}>
            <Text caption style={[styles.text, styles.caption]}>{l10n.LAST_30_DAYS}</Text>
            <Text caption level={2} style={[styles.text, styles.ruler]}>{l10n.EXPENSES.toLowerCase()}</Text>
          </View>
          <View style={styles.row}>
            <Icon value={progression > 0 ? iconIncome : iconExpense} />
            <Price
              fixed={2}
              color={progression > 0 ? COLOR.INCOMES : COLOR.EXPENSES}
              subtitle
              level={2}
              symbol="%"
              style={styles.text}
              value={Math.abs((progression * 100) / (value - progression))}
            />
            <View style={styles.separator} />
            <Price
              {...priceProps}
              subtitle
              level={2}
              style={styles.text}
              value={progression}
            />
          </View>
        </View>
      )}
    </Consumer>
  );
};

BalanceCard.propTypes = {
  chart: shape({}),
  color: string,
  currency: string,
  title: string.isRequired,
  value: number,
};

BalanceCard.defaultProps = {
  chart: {},
  color: COLOR.PRIMARY,
  currency: 'EUR',
  value: undefined,
};

export default BalanceCard;

import { shape, number, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Price, Text } from '../../reactor/components';
import BulletPrice from '../BulletPrice';
import Chart from '../Chart';
import styles from './BalanceCard.style';

const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

const BalanceCard = ({
  chart, color, currency, lastWeek, title, value, ...inherit
}) => {
  const priceProps = { fixed: FIXED[currency], symbol: SYMBOL[currency], style: styles.text };

  return (
    <Consumer>
      { ({ l10n }) => (
        <View style={[styles.container, inherit.style, { backgroundColor: color, shadowColor: color }]}>
          <View style={styles.background}>
            <Price {...priceProps} headline level={1} value={value} />
          </View>
          <View style={[styles.row, styles.summary]}>
            <View>
              <Text subtitle level={2} style={[styles.text, styles.caption]}>{title}</Text>
              <Price {...priceProps} headline level={4} value={value} />
            </View>
            <View style={styles.info}>
              <Text subtitle level={3} style={[styles.text, styles.caption]}>{l10n.THIS_WEEK}</Text>
              <View style={styles.row}>
                <BulletPrice
                  {...priceProps}
                  color={COLOR.WHITE}
                  incomes
                  value={lastWeek.incomes}
                  style={styles.bulletPrice}
                />
                <BulletPrice
                  color={COLOR.WHITE}
                  currency={currency}
                  value={lastWeek.expenses}
                  style={styles.bulletPrice}
                />
              </View>
            </View>
          </View>
          <Chart color={COLOR.WHITE} {...chart} />
        </View>
      )}
    </Consumer>
  );
};

BalanceCard.propTypes = {
  chart: shape({}),
  color: number,
  currency: number.isRequired,
  lastWeek: shape({}),
  title: string.isRequired,
  value: number.isRequired,
};

BalanceCard.defaultProps = {
  chart: {},
  color: COLOR.PRIMARY,
  lastWeek: {},
};

export default BalanceCard;

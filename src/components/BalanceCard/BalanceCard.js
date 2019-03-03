import { shape, number, string } from 'prop-types';
import React, { Fragment } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Slider, Text } from '../../reactor/components';
import Chart from '../Chart';
import HeadingItem from '../HeadingItem';
import Percentage from '../Percentage';
import PriceFriendly from '../PriceFriendly';
import styles from './BalanceCard.style';

const { logo } = ASSETS;
const { SLIDER } = C;
const { COLOR } = THEME;

const BalanceCard = ({
  chart, currency, currentBalance, currentMonth, title, ...inherit
}) => {
  const {
    progression = 0, incomes = 0, expenses = 0,
  } = currentMonth;
  const progressionPercentage = currentBalance - progression > 0
    ? (progression * 100) / (currentBalance - progression)
    : progression;
  const days = (new Date()).getDate();

  return (
    <Consumer>
      { ({ store: { baseCurrency, rates }, l10n }) => (
        <View style={[styles.container, inherit.style]}>
          <View style={styles.section}>
            <View style={styles.row}>
              <Image source={logo} resizeMode="contain" style={styles.logo} />
              <Text subtitle level={2} style={styles.subtitle}>{title}</Text>
            </View>
            <PriceFriendly
              currency={baseCurrency}
              headline
              level={4}
              value={baseCurrency !== currency
                ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                : Math.abs(currentBalance)}
            />
            { baseCurrency !== currency && (
              <PriceFriendly currency={currency} subtitle level={2} lighten value={currentBalance} />)}
          </View>

          <HeadingItem title={l10n.CURRENT_MONTH} />
          <View style={[styles.row, styles.section]}>
            <View style={styles.card}>
              <Text caption level={2} numberOfLines={1}>{l10n.PROGRESSION.toUpperCase()}</Text>
              <Percentage headline level={5} value={progressionPercentage} />
              <PriceFriendly
                subtitle
                level={3}
                lighten
                currency={baseCurrency}
                value={progression}
              />
            </View>

            <View style={[styles.card, incomes === 0 && styles.cardDisabled]}>
              <Text caption level={2} numberOfLines={1}>{l10n.INCOMES.toUpperCase()}</Text>
              <PriceFriendly headline level={5} currency={baseCurrency} value={incomes} />
              <View style={styles.row}>
                <PriceFriendly subtitle level={3} lighten fixed={0} currency={baseCurrency} value={incomes / days} />
                <Text level={3} lighten>{` / ${l10n.DAY}`}</Text>
              </View>
            </View>

            <View style={[styles.card, styles.cardLast, expenses === 0 && styles.cardDisabled]}>
              <Text caption level={2} lighten={expenses === 0} numberOfLines={1}>{l10n.EXPENSES.toUpperCase()}</Text>
              <PriceFriendly headline level={5} lighten={expenses === 0} currency={baseCurrency} value={expenses} />
              <View style={styles.row}>
                <PriceFriendly subtitle level={3} lighten fixed={0} currency={baseCurrency} value={expenses / days} />
                <Text level={3} lighten>{` / ${l10n.DAY}`}</Text>
              </View>
            </View>
          </View>


          { chart && (
            <Fragment>
              <HeadingItem title={l10n.LAST_6_MONTHS} />
              <Slider {...SLIDER} style={styles.slider}>
                <View style={styles.card}>
                  <Text caption level={2} numberOfLines={1}>{l10n.BALANCE.toUpperCase()}</Text>
                  <Chart values={chart.balance} color={COLOR.INCOMES} />
                </View>

                <View style={styles.card}>
                  <Text caption level={2} numberOfLines={1}>{l10n.EXPENSES.toUpperCase()}</Text>
                  <Chart values={chart.expenses} color={COLOR.EXPENSES} />
                </View>

                <View style={styles.card}>
                  <Text caption level={2} numberOfLines={1}>{l10n.INCOMES.toUpperCase()}</Text>
                  <Chart values={chart.incomes} color={COLOR.INCOMES} />
                </View>
              </Slider>
            </Fragment>
          )}
        </View>
      )}
    </Consumer>
  );
};

BalanceCard.propTypes = {
  chart: shape({}),
  currency: string,
  currentBalance: number,
  currentMonth: shape({}),
  title: string.isRequired,
};

BalanceCard.defaultProps = {
  chart: undefined,
  currency: 'EUR',
  currentBalance: undefined,
  currentMonth: {},
};

export default BalanceCard;

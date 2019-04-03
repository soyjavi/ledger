import { shape, number, string } from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { Slider, Text } from '../../reactor/components';
import HeadingItem from '../HeadingItem';
import Percentage from '../Percentage';
import PriceFriendly from '../PriceFriendly';
import styles from './BalanceCard.style';

const { logo } = ASSETS;
const { SLIDER } = C;

const MonthCard = ({ title, value }) => (
  <Consumer>
    { ({ store: { baseCurrency }, l10n }) => (
      <View style={[styles.card, value === 0 && styles.cardDisabled]}>
        <Text caption level={2} lighten={value === 0} numberOfLines={1}>{title.toUpperCase()}</Text>
        <PriceFriendly headline level={5} lighten={value === 0} currency={baseCurrency} value={value} />
        <View style={styles.row}>
          <PriceFriendly
            subtitle
            level={3}
            lighten
            fixed={0}
            currency={baseCurrency}
            value={value / (new Date()).getDate()}
          />
          <Text level={3} lighten>{` / ${l10n.DAY}`}</Text>
        </View>
      </View>
    )}
  </Consumer>
);

MonthCard.propTypes = {
  title: string.isRequired,
  value: number.isRequired,
};

class BalanceCard extends Component {
  static propTypes = {
    currency: string,
    currentBalance: number,
    currentMonth: shape({}),
    title: string.isRequired,
  };

  static defaultProps = {
    currency: 'EUR',
    currentBalance: undefined,
    currentMonth: {},
  };

  shouldComponentUpdate({ currentBalance }) {
    const { props } = this;

    return currentBalance !== props.currentBalance;
  }

  render() {
    const {
      currency, currentBalance, currentMonth, title, ...inherit
    } = this.props;

    const {
      progression = 0, incomes = 0, expenses = 0, transfers = 0,
    } = currentMonth;
    const progressionPercentage = currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression;

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
            <Slider {...SLIDER} style={styles.slider}>
              <View style={styles.card}>
                <Text caption level={2} numberOfLines={1}>{l10n.BALANCE.toUpperCase()}</Text>
                <Percentage headline level={5} value={progressionPercentage} />
                <PriceFriendly
                  subtitle
                  level={3}
                  lighten
                  currency={baseCurrency}
                  value={progression}
                />
              </View>
              <MonthCard title={l10n.EXPENSES} value={expenses} />
              <MonthCard title={l10n.INCOMES} value={incomes} />
              <MonthCard title={`${l10n.VAULT} ${l10n.TRANSFERS}`} value={transfers} />
            </Slider>
          </View>
        )}
      </Consumer>
    );
  }
}

export default BalanceCard;

import { shape, number, string } from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { Button, Text } from '../../reactor/components';
import Chart from '../Chart';
import HeadingItem from '../HeadingItem';
import Percentage from '../Percentage';
import PriceFriendly from '../PriceFriendly';
import styles from './BalanceCard.style';

const { SCREEN } = C;
const { logo } = ASSETS;

const captionProps = {
  caption: true, level: 2, lighten: true, numberOfLines: 1, style: styles.cardCaption,
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

    const { progression = 0, incomes = 0, expenses = 0 } = currentMonth;
    const progressionPercentage = currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression;

    console.log('inherit', inherit);

    return (
      <Consumer>
        { ({
          l10n,
          navigation,
          store: { baseCurrency, rates },
        }) => (
          <View style={[styles.container, inherit.style]}>
            <View style={styles.content}>
              <View style={styles.row}>
                <Image source={logo} resizeMode="contain" style={styles.logo} />
                <Text caption level={2} lighten>{title.toUpperCase()}</Text>
              </View>
              <PriceFriendly
                headline
                level={4}
                currency={baseCurrency}
                value={baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)}
              />
              <View style={styles.row}>
                { baseCurrency !== currency && (
                  <PriceFriendly currency={currency} value={currentBalance} subtitle level={2} lighten />
                )}
              </View>
            </View>

            <HeadingItem title={l10n.CURRENT_MONTH}>
              <Button outlined small title="$Show" onPress={() => navigation.navigate(SCREEN.STATS)} />
            </HeadingItem>
            <View style={[styles.row, styles.cards]}>
              <View style={styles.card}>
                <Percentage headline level={6} value={progressionPercentage} />
                <Text {...captionProps}>{l10n.PROGRESS.toUpperCase()}</Text>
              </View>
              <View style={styles.card}>
                <PriceFriendly headline level={6} lighten={incomes === 0} currency={baseCurrency} value={incomes} />
                <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
              </View>
              <View style={[styles.card, styles.cardLast]}>
                <PriceFriendly headline level={6} lighten={expenses === 0} currency={baseCurrency} value={expenses} />
                <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default BalanceCard;

import {
  bool, func, shape, number, oneOfType, string,
} from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';

import { Text, Touchable } from '../../reactor/components';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import ButtonMore from '../ButtonMore';
import Heading from '../Heading';
import PriceFriendly from '../PriceFriendly';
import styles from './Summary.style';

const { CURRENCY, SCREEN } = C;

const captionProps = {
  caption: true, level: 2, lighten: true, numberOfLines: 1,
};

class Summary extends Component {
  static propTypes = {
    currency: string,
    currentBalance: number,
    currentMonth: shape({}),
    image: oneOfType([number, string]),
    mask: bool,
    onMask: func,
    title: string.isRequired,
  };

  static defaultProps = {
    currency: CURRENCY,
    currentBalance: undefined,
    currentMonth: {},
    mask: false,
    onMask: undefined,
    image: ASSETS.logo,
  };

  shouldComponentUpdate({ currency, currentBalance, mask }) {
    const { props } = this;

    return currency !== props.currency || currentBalance !== props.currentBalance || mask !== props.mask;
  }

  render() {
    const {
      props: {
        currency, currentBalance, currentMonth, image, mask, onMask, title, ...inherit
      },
    } = this;

    const {
      expenses = 0, incomes = 0, progression = 0, today = 0,
    } = currentMonth;
    const progressionPercentage = currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression;

    return (
      <Consumer>
        { ({ l10n, navigation, store: { baseCurrency, rates } }) => (
          <View style={[styles.container, inherit.style]}>
            <Touchable onPress={onMask ? () => onMask(!mask) : undefined} style={[styles.card, styles.content]}>
              <View style={[styles.row, styles.title]}>
                <Image source={image} resizeMode="contain" style={styles.image} />
                <Text caption level={2}>{title.toUpperCase()}</Text>
              </View>
              <PriceFriendly
                currency={baseCurrency}
                headline
                mask={mask}
                level={4}
                value={baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)}
              />
              <View style={styles.row}>
                { baseCurrency !== currency && (
                  <PriceFriendly
                    currency={currency}
                    mask={mask}
                    subtitle
                    level={2}
                    lighten
                    value={currentBalance}
                  />
                )}
              </View>
              <View style={styles.breakLine} />
              <View style={styles.row}>
                <View>
                  <Text {...captionProps}>{l10n.PROGRESSION.toUpperCase()}</Text>
                  <PriceFriendly currency="%" icon subtitle level={3} value={progressionPercentage} />
                </View>
              </View>
            </Touchable>

            <Heading subtitle={l10n.ACTIVITY}>
              <ButtonMore
                title={l10n.MORE}
                onPress={() => navigation.navigate(SCREEN.STATS)}
              />
            </Heading>
            <View style={[styles.row, styles.cards]}>
              <View style={[styles.card, styles.cardIncomes]}>
                <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
                <PriceFriendly
                  currency={baseCurrency}
                  headline
                  level={6}
                  lighten={incomes === 0}
                  mask={mask}
                  value={incomes}
                />
              </View>
              <View style={[styles.card, styles.cardExpenses]}>
                <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
                <PriceFriendly
                  currency={baseCurrency}
                  headline
                  level={6}
                  lighten={expenses === 0}
                  mask={mask}
                  value={expenses}
                />
              </View>
              <View style={[styles.card, styles.cardLast]}>
                <Text {...captionProps}>{l10n.TODAY.toUpperCase()}</Text>
                <PriceFriendly
                  currency={baseCurrency}
                  headline
                  level={6}
                  mask={mask}
                  operator
                  value={today}
                />
              </View>
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Summary;

import {
  shape, number, oneOfType, string,
} from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Text } from '../../reactor/components';
import Heading from '../Heading';
import Percentage from '../Percentage';
import PriceFriendly from '../PriceFriendly';
import styles from './Summary.style';

const { SCREEN } = C;
const { COLOR } = THEME;

const captionProps = {
  caption: true, level: 2, lighten: true, numberOfLines: 1,
};

class Summary extends Component {
  static propTypes = {
    currency: string,
    currentBalance: number,
    currentMonth: shape({}),
    image: oneOfType([number, string]),
    title: string.isRequired,
  };

  static defaultProps = {
    currency: 'EUR',
    currentBalance: undefined,
    currentMonth: {},
    image: ASSETS.logo,
  };

  shouldComponentUpdate({ currentBalance }) {
    const { props } = this;

    return currentBalance !== props.currentBalance;
  }

  render() {
    const {
      currency, currentBalance, currentMonth, image, title, ...inherit
    } = this.props;

    const { progression = 0, incomes = 0, expenses = 0 } = currentMonth;
    const progressionPercentage = currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression;

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
                <Image source={image} resizeMode="contain" style={styles.logo} />
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

            <Heading title={l10n.CURRENT_MONTH}>
              <Button
                color={COLOR.PRIMARY}
                outlined
                small
                title={l10n.ACTIVITY}
                onPress={() => navigation.navigate(SCREEN.STATS)}
              />
            </Heading>
            <View style={[styles.row, styles.cards]}>
              <View style={styles.card}>
                <Text {...captionProps}>{l10n.PROGRESS.toUpperCase()}</Text>
                <Percentage headline level={6} value={progressionPercentage} />
              </View>
              <View style={styles.card}>
                <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
                <PriceFriendly headline level={6} lighten={incomes === 0} currency={baseCurrency} value={incomes} />
              </View>
              <View style={[styles.card, styles.cardLast]}>
                <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
                <PriceFriendly headline level={6} lighten={expenses === 0} currency={baseCurrency} value={expenses} />
              </View>
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Summary;

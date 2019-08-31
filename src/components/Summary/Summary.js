import {
  bool, func, shape, number, oneOfType, string,
} from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import ButtonMore from '../ButtonMore';
import PriceFriendly from '../PriceFriendly';
import { Text, Touchable } from '../../reactor/components';
import styles from './Summary.style';

const { CURRENCY, SCREEN, STYLE: { CARD_GRADIENT } } = C;

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
            <LinearGradient {...CARD_GRADIENT} style={styles.card}>
              <View style={[styles.row, styles.rowHeading]}>
                <Image source={image} resizeMode="contain" style={styles.image} />
                <Text caption level={2} style={styles.expand}>{title.toUpperCase()}</Text>

                <ButtonMore
                  title={l10n.ACTIVITY}
                  onPress={() => navigation.navigate(SCREEN.STATS)}
                />
              </View>
              <Touchable onPress={onMask ? () => onMask(!mask) : undefined}>
                <PriceFriendly
                  currency={baseCurrency}
                  headline
                  mask={mask}
                  level={4}
                  value={baseCurrency !== currency
                    ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                    : Math.abs(currentBalance)}
                />
              </Touchable>
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

              <View style={styles.expand} />
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <Text {...captionProps}>{l10n.PROGRESSION.toUpperCase()}</Text>
                  <PriceFriendly currency="%" icon subtitle level={3} value={progressionPercentage} />
                </View>

                <View style={styles.rowItem}>
                  <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
                  <PriceFriendly currency={baseCurrency} subtitle level={3} mask={mask} value={incomes} />
                </View>

                <View style={[styles.rowItem, styles.rowItemExpanded]}>
                  <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
                  <PriceFriendly currency={baseCurrency} subtitle level={3} mask={mask} value={expenses} />
                </View>

                <View>
                  <Text {...captionProps}>{l10n.TODAY.toUpperCase()}</Text>
                  <PriceFriendly currency={baseCurrency} subtitle level={3} mask={mask} operator value={today} />
                </View>

              </View>
            </LinearGradient>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Summary;

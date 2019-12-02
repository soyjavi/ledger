import {
  func, shape, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange, verboseMonth } from '../../common';
import { Consumer } from '../../context';
import Box from '../Box';
import ButtonMore from '../ButtonMore';
import PriceFriendly from '../PriceFriendly';
import { Text, Touchable } from '../../reactor/components';
import styles from './Summary.style';

const { CURRENCY, SCREEN, SETTINGS: { HIDE_OVERALL_BALANCE } } = C;

const captionProps = { caption: true, lighten: true, numberOfLines: 1 };

const PriceSmall = ({ value = 0, ...inherit }) => (
  <PriceFriendly {...inherit} subtitle lighten={value === 0} value={value} />
);

PriceSmall.propTypes = {
  value: number.isRequired,
};

const Summary = React.memo(({
  currency, currentBalance, currentMonth, image, onMask, title, ...inherit
}) => {
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
          <Box style={styles.card}>
            <View style={[styles.row, styles.rowHeading]}>
              <Image source={image} resizeMode="contain" style={styles.image} />
              <Text caption style={styles.expand}>{title.toUpperCase()}</Text>

              <ButtonMore
                title={l10n.ACTIVITY}
                onPress={() => navigation.navigate(SCREEN.STATS)}
              />
            </View>
            <Touchable onPress={() => {
              console.log('mask');
            }}>
              <PriceFriendly
                currency={baseCurrency}
                headline
                value={baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)}
              />
            </Touchable>
            { baseCurrency !== currency && (
              <PriceFriendly
                currency={currency}
                subtitle
                lighten
                value={currentBalance}
              />
            )}

            <View style={styles.expand} />
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text {...captionProps}>{verboseMonth(new Date(), l10n).toUpperCase()}</Text>
                <PriceSmall currency="%" icon value={progressionPercentage} />
              </View>

              <View style={styles.rowItem}>
                <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
                <PriceSmall currency={baseCurrency} value={incomes} />
              </View>

              <View style={[styles.rowItem, styles.rowItemExpanded]}>
                <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
                <PriceSmall currency={baseCurrency} value={expenses} />
              </View>

              <View>
                <Text {...captionProps}>{l10n.TODAY.toUpperCase()}</Text>
                <PriceSmall currency={baseCurrency} value={today} />
              </View>
            </View>
          </Box>
        </View>
      )}
    </Consumer>
  );
});

Summary.propTypes = {
  currency: string,
  currentBalance: number,
  currentMonth: shape({}),
  image: oneOfType([number, string]),
  onMask: func,
  title: string.isRequired,
};

Summary.defaultProps = {
  currency: CURRENCY,
  currentBalance: undefined,
  currentMonth: {},
  onMask: undefined,
  image: ASSETS.logo,
};

export default Summary;

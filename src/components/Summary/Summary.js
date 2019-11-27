import {
  bool, func, shape, number, oneOfType, string,
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

const { CURRENCY, SCREEN } = C;

const captionProps = {
  caption: true, level: 2, lighten: true, numberOfLines: 1,
};

const PriceSmall = ({ value = 0, ...inherit }) => (
  <PriceFriendly {...inherit} subtitle level={3} lighten={value === 0} value={value} />
);

PriceSmall.propTypes = {
  value: number.isRequired,
};

const Summary = React.memo(({
  currency, currentBalance, currentMonth, image, mask, onMask, title, ...inherit
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
                level={3}
                lighten
                value={currentBalance}
              />
            )}

            <View style={styles.expand} />
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text {...captionProps}>{verboseMonth(new Date(), l10n).toUpperCase()}</Text>
                <PriceSmall currency="%" icon mask={mask} value={progressionPercentage} />
              </View>

              <View style={styles.rowItem}>
                <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
                <PriceSmall currency={baseCurrency} mask={mask} value={incomes} />
              </View>

              <View style={[styles.rowItem, styles.rowItemExpanded]}>
                <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
                <PriceSmall currency={baseCurrency} mask={mask} value={expenses} />
              </View>

              <View>
                <Text {...captionProps}>{l10n.TODAY.toUpperCase()}</Text>
                <PriceSmall currency={baseCurrency} mask={mask} value={today} />
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
  mask: bool,
  onMask: func,
  title: string.isRequired,
};

Summary.defaultProps = {
  currency: CURRENCY,
  currentBalance: undefined,
  currentMonth: {},
  mask: false,
  onMask: undefined,
  image: ASSETS.logo,
};

export default Summary;

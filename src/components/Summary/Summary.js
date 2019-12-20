import { shape, number, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange, verboseMonth } from '../../common';
import {
  useL10N, useNavigation, useSettings, useStore,
} from '../../context';
import Box from '../Box';
import PriceFriendly from '../PriceFriendly';
import { Button, Text, Touchable } from '../../reactor/components';
import styles from './Summary.style';

const { CURRENCY, SCREEN } = C;

const BoxSummary = ({ caption, value, ...inherit }) => (
  <Box opacity={1}>
    <Text caption lighten={value === 0}>{caption.toUpperCase()}</Text>
    <PriceFriendly
      {...inherit}
      caption
      bold
      lighten={value === 0}
      value={value}
    />
  </Box>
);

BoxSummary.propTypes = {
  caption: string.isRequired,
  value: number.isRequired,
};

const Summary = React.memo(({
  currency, currentBalance, currentMonth, image, title,
}) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();
  const navigation = useNavigation();
  const { state: { maskAmount }, dispatch } = useSettings();

  const {
    expenses = 0, incomes = 0, progression = 0, today = 0,
  } = currentMonth;
  const progressionPercentage = currentBalance - progression > 0
    ? (progression * 100) / (currentBalance - progression)
    : progression;

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.spaceBetween]}>
        <View>
          <View style={styles.row}>
            <Image source={image} resizeMode="contain" style={styles.image} />
            <Text caption numberOfLines={1}>{title.toUpperCase()}</Text>
          </View>
          <Touchable onPress={() => dispatch({ type: 'MASK_AMOUNT', value: !maskAmount })}>
            <PriceFriendly
              currency={baseCurrency}
              headline
              style={styles.balance}
              value={baseCurrency !== currency
                ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                : Math.abs(currentBalance)}
            />
          </Touchable>
          { baseCurrency !== currency && (
            <PriceFriendly currency={currency} subtitle lighten value={currentBalance} />
          )}
        </View>

        <Button
          outlined
          small
          title={l10n.ACTIVITY}
          onPress={() => navigation.go(SCREEN.STATS)}
        />

      </View>

      <View style={styles.expand} />

      <View style={[styles.row, styles.spaceBetween]}>
        <BoxSummary caption={verboseMonth(new Date(), l10n)} currency="%" operator value={progressionPercentage} />
        <BoxSummary caption={l10n.INCOMES} currency={baseCurrency} value={incomes} />
        <BoxSummary caption={l10n.EXPENSES} currency={baseCurrency} value={expenses} />
        <BoxSummary caption={l10n.TODAY} currency={baseCurrency} operator value={today} />
      </View>
    </View>
  );
});

Summary.propTypes = {
  currency: string,
  currentBalance: number,
  currentMonth: shape({}),
  image: string,
  title: string,
};

Summary.defaultProps = {
  currency: CURRENCY,
  currentBalance: undefined,
  currentMonth: {},
  image: ASSETS.logo,
  title: '',
};

export default Summary;

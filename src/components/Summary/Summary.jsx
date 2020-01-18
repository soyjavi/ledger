import { oneOfType, shape, number, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Text, Touchable } from '../../reactor/components';
import { LOGO } from '../../assets';
import { C, exchange, verboseMonth } from '../../common';
import { useL10N, useNavigation, useSettings, useStore } from '../../context';
import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import styles from './Summary.style';

const { CURRENCY, SCREEN } = C;
const { COLOR } = THEME;

const BoxSummary = ({ caption, value, style = styles.box, ...inherit }) => (
  <Box style={style}>
    <Text caption lighten>
      {caption.toUpperCase()}
    </Text>
    <PriceFriendly {...inherit} caption lighten={value === 0} value={value} />
  </Box>
);

BoxSummary.propTypes = {
  caption: string.isRequired,
  style: number,
  value: number.isRequired,
};

const Summary = ({ currency, currentBalance, currentMonth, image, title }) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();
  const navigation = useNavigation();
  const {
    state: { maskAmount },
    dispatch,
  } = useSettings();

  const { expenses = 0, incomes = 0, progression = 0, today = 0 } = currentMonth;
  const progressionPercentage =
    currentBalance - progression > 0 ? (progression * 100) / (currentBalance - progression) : progression;

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.content, styles.spaceBetween]}>
        <View>
          <View style={styles.row}>
            <Image source={image} resizeMode="contain" style={styles.image} />
            <Text caption numberOfLines={1}>
              {title.toUpperCase()}
            </Text>
          </View>
          <Touchable onPress={() => dispatch({ type: 'MASK_AMOUNT', value: !maskAmount })}>
            <PriceFriendly
              currency={baseCurrency}
              headline
              style={styles.balance}
              value={
                baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)
              }
            />
          </Touchable>
          {baseCurrency !== currency && <PriceFriendly currency={currency} subtitle lighten value={currentBalance} />}
        </View>

        <Button
          color={COLOR.PRIMARY}
          onPress={() => navigation.go(SCREEN.STATS)}
          outlined
          small
          style={styles.button}
          title={l10n.ACTIVITY}
        />
      </View>

      <View style={[styles.row, styles.spaceBetween]}>
        <BoxSummary caption={verboseMonth(new Date(), l10n)} currency="%" operator value={progressionPercentage} />
        <BoxSummary caption={l10n.INCOMES} currency={baseCurrency} value={incomes} />
        <BoxSummary caption={l10n.EXPENSES} currency={baseCurrency} value={expenses} />
        <BoxSummary caption={l10n.TODAY} currency={baseCurrency} operator value={today} style={null} />
      </View>
    </View>
  );
};

Summary.propTypes = {
  currency: string,
  currentBalance: number,
  currentMonth: shape({}),
  image: oneOfType([number, string]),
  title: string,
};

Summary.defaultProps = {
  currency: CURRENCY,
  currentBalance: undefined,
  currentMonth: {},
  image: LOGO,
  title: '',
};

export { Summary };

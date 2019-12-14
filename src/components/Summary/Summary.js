import {
  func, shape, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange, verboseMonth } from '../../common';
import { Consumer, useNavigation, useSettings } from '../../context';
import Box from '../Box';
import ButtonMore from '../ButtonMore';
import PriceFriendly from '../PriceFriendly';
import { Text, Touchable } from '../../reactor/components';
import styles from './Summary.style';

const { CURRENCY, SCREEN } = C;

const CAPTION_PROPS = { caption: true, lighten: true, numberOfLines: 1 };

const Summary = React.memo(({
  currency, currentBalance, currentMonth, image, onMask, title, ...inherit
}) => {
  const navigation = useNavigation();
  const { state: { maskAmount }, dispatch } = useSettings();

  const {
    expenses = 0, incomes = 0, progression = 0, today = 0,
  } = currentMonth;
  const progressionPercentage = currentBalance - progression > 0
    ? (progression * 100) / (currentBalance - progression)
    : progression;

  return (
    <Consumer>
      { ({ l10n, store: { baseCurrency, rates } }) => (
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
            <Touchable onPress={() => dispatch({ type: 'MASK_AMOUNT', value: !maskAmount })}>
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
                <Text {...CAPTION_PROPS}>{verboseMonth(new Date(), l10n).toUpperCase()}</Text>
                <PriceFriendly caption bold lighten={progressionPercentage === 0} currency="%" icon value={progressionPercentage} />
              </View>

              <View style={styles.rowItem}>
                <Text {...CAPTION_PROPS}>{l10n.INCOMES.toUpperCase()}</Text>
                <PriceFriendly caption bold lighten={incomes === 0} currency={baseCurrency} value={incomes} />
              </View>

              <View style={[styles.rowItem, styles.rowItemExpanded]}>
                <Text {...CAPTION_PROPS}>{l10n.EXPENSES.toUpperCase()}</Text>
                <PriceFriendly caption bold lighten={expenses === 0} currency={baseCurrency} value={expenses} />
              </View>

              <View>
                <Text {...CAPTION_PROPS}>{l10n.TODAY.toUpperCase()}</Text>
                <PriceFriendly caption bold lighten={today === 0} currency={baseCurrency} value={today} />
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

import {
  // helpers
  ALIGN,
  COLOR,
  // components
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { C, exchange, getProgressionPercentage, L10N } from '@common';
import { useStore } from '@context';

import { PriceFriendly } from '../PriceFriendly';
import { verboseMonth } from './helpers';
import { SummaryBox } from './Summary.Box';
import { style } from './Summary.style';

const { CURRENCY } = C;

const Summary = ({ children, currency = CURRENCY, currentBalance, currentMonth = {}, title = '' }) => {
  const {
    rates,
    settings: { baseCurrency, maskAmount },
    updateSettings,
  } = useStore();

  const { expenses = 0, incomes = 0, progression = 0, progressionCurrency = 0, today = 0 } = currentMonth;
  const progressionPercentage = getProgressionPercentage(
    currentBalance,
    currency === baseCurrency ? progression : progressionCurrency,
  );

  return (
    <View style={style.container}>
      <Text action color={COLOR.GRAYSCALE_L} level={2} upperCase>
        {title}
      </Text>

      <Touchable alignSelf={ALIGN.CENTER} onPress={() => updateSettings({ maskAmount: !maskAmount })}>
        <PriceFriendly currency={currency} heading level={1} value={Math.abs(currentBalance)} />
      </Touchable>
      {baseCurrency !== currency && (
        <PriceFriendly
          color={COLOR.GRAYSCALE_L}
          currency={baseCurrency}
          value={exchange(Math.abs(currentBalance), currency, baseCurrency, rates)}
        />
      )}

      <View style={style.summary}>
        <SummaryBox
          caption={verboseMonth(new Date(), L10N)}
          currency="%"
          highlight={progressionPercentage > 0}
          operator
          value={progressionPercentage}
        />
        <SummaryBox caption={L10N.INCOMES} currency={baseCurrency} value={incomes} />
        <SummaryBox caption={L10N.EXPENSES} currency={baseCurrency} value={expenses} />
        <SummaryBox caption={L10N.TODAY} currency={baseCurrency} operator value={today} />
      </View>

      {children && <View style={style.children}>{children}</View>}
    </View>
  );
};

Summary.propTypes = {
  children: PropTypes.node,
  currency: PropTypes.string,
  currentBalance: PropTypes.number,
  currentMonth: PropTypes.shape({}),
  title: PropTypes.string,
  onSettings: PropTypes.func,
};

export { Summary };

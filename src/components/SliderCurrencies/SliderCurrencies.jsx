import {
  // helpers
  COLOR,
  styles,
  // components
  ScrollView,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { getCurrencySymbol } from '@common';
import { useStore } from '@context';

import { Option, OPTION_SIZE } from '../Option';
import { queryCurrencies } from './helpers';
import { style } from './SliderCurrencies.style';

const SliderCurrencies = ({ modal, selected, onChange, ...others }) => {
  const {
    screen: { width },
  } = useDevice();
  const store = useStore();

  const currencies = queryCurrencies(store);
  const index = currencies.findIndex((item) => item === selected);

  return (
    <ScrollView {...others} horizontal scrollTo={(index - 1) * OPTION_SIZE} snapInterval={OPTION_SIZE} width={width}>
      {currencies.map((currency, index) => (
        <Option
          caption={getCurrencySymbol(currency)}
          color={COLOR.GRAYSCALE_XL}
          currency
          key={index}
          legend={currency}
          style={styles(
            style.card,
            index === 0 && (modal ? style.firstCardModal : style.firstCard),
            index === currencies.length - 1 && (modal ? style.lastCardModal : style.lastCard),
          )}
          onPress={() => onChange(currency)}
          selected={selected === currency}
        />
      ))}
    </ScrollView>
  );
};

SliderCurrencies.propTypes = {
  modal: PropTypes.bool,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { SliderCurrencies };

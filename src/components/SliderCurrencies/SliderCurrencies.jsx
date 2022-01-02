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

  return (
    <ScrollView {...others} horizontal snapInterval={OPTION_SIZE} width={width}>
      {currencies.map((currency, index) => (
        <Option
          caption={currency}
          color={COLOR.INFO}
          currency={currency}
          key={index}
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

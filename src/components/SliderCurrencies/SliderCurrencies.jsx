import {
  // components
  ScrollView,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { useStore } from '@context';

import { Option, OPTION_SIZE } from '../Option';
import { queryCurrencies } from './modules';
import { style } from './SliderCurrencies.style';

const SliderCurrencies = ({ color, onChange, selected, ...others }) => {
  const {
    screen: { width },
  } = useDevice();
  const store = useStore();

  return (
    <ScrollView {...others} horizontal snapInterval={OPTION_SIZE} style={[others.style]} width={width}>
      {queryCurrencies(store).map((currency, index) => (
        <Option
          caption={currency}
          color={color}
          currency={currency}
          key={index}
          style={index === 0 ? style.firstCard : style.card}
          onPress={() => onChange(currency)}
          selected={selected === currency}
        />
      ))}
    </ScrollView>
  );
};

SliderCurrencies.propTypes = {
  color: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { SliderCurrencies };

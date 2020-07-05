import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { FLAGS } from '@assets';
import { Option, OPTION_SIZE } from '@components/Option';
import { useStore } from '@context';

import { queryCurrencies } from './modules';

const { SPACE } = THEME;

export const SliderCurrencies = ({ onChange, selected }) => {
  const store = useStore();

  return (
    <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE}>
      {queryCurrencies(store).map((currency, index) => (
        <Option
          caption={currency}
          image={FLAGS[currency]}
          key={index}
          marginRight="S"
          onPress={() => onChange(currency)}
          selected={selected === currency}
        />
      ))}
    </Slider>
  );
};

SliderCurrencies.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

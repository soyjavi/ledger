import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { Option, OPTION_SIZE } from '@components/Option';
import { useStore } from '@context';

import { queryCurrencies } from './modules';

const { COLOR, SPACE } = THEME;

const SliderCurrencies = ({ onChange, selected, ...others }) => {
  const store = useStore();

  return (
    <Slider {...others} itemMargin={SPACE.S} itemWidth={OPTION_SIZE}>
      {queryCurrencies(store).map((currency, index) => (
        <Option
          caption={currency}
          color={COLOR.BASE_LIGHTEN}
          currency={currency}
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

export { SliderCurrencies };

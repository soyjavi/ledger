import {
  // helpers
  COLOR,
  styles,
  // components
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { L10N } from '@common';

import { Input } from '../Input';
import { InputCurrency } from '../InputCurrency';
import { SliderCurrencies } from '../SliderCurrencies';
import { style } from './FormVault.style';

const FormVault = ({ form = {}, modal = false, onChange, ...others }) => {
  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };

    onChange({
      ...next,
      valid: next.currency !== undefined && next.title !== undefined,
    });
  };

  const isEmpty = !form.currency;

  return (
    <View {...others}>
      <SliderCurrencies
        animated={!isEmpty}
        modal={modal}
        scrollTo={isEmpty ? 0 : undefined}
        selected={form.currency}
        style={styles(style.slider, modal ? style.sliderModal : style.sliderFullScreen)}
        onChange={(currency) => handleChange('currency', currency)}
      />

      <InputCurrency
        backgroundColor={COLOR.INFO}
        label={L10N.INITIAL_BALANCE}
        value={form.balance}
        vault={{ currency: form.currency }}
        onChange={(value) => handleChange('balance', value)}
      />

      <Input
        backgroundColor={COLOR.INFO}
        label={L10N.NAME}
        value={form.title}
        onChange={(value) => handleChange('title', value)}
      />
    </View>
  );
};

FormVault.propTypes = {
  form: PropTypes.shape({}),
  modal: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export { FormVault };

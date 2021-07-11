import {
  // helpers
  SIZE,
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

const FormVault = ({ optionColor, form = {}, onChange, ...others }) => {
  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };

    onChange({
      ...next,
      valid: next.currency !== undefined && next.title !== undefined,
    });
  };

  return (
    <View {...others}>
      <SliderCurrencies
        color={optionColor}
        selected={form.currency}
        onChange={(currency) => handleChange('currency', currency)}
        style={style.slider}
      />

      <InputCurrency
        label={L10N.INITIAL_BALANCE}
        marginBottom={SIZE.M}
        value={form.balance}
        vault={{ currency: form.currency }}
        onChange={(value) => handleChange('balance', value)}
      />

      <Input label={L10N.NAME} value={form.title} onChange={(value) => handleChange('title', value)} />
    </View>
  );
};

FormVault.propTypes = {
  form: PropTypes.shape({}),
  optionColor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { FormVault };

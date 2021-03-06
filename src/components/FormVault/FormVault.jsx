import PropTypes from 'prop-types';
import React from 'react';

import { Input } from '@components/Input';
import { InputCurrency } from '@components/InputCurrency';
import { SliderCurrencies } from '@components/SliderCurrencies';
import { useL10N } from '@context';

const FormVault = ({ form = {}, onChange }) => {
  const l10n = useL10N();

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };

    onChange({
      ...next,
      valid: next.currency !== undefined && next.title !== undefined,
    });
  };

  return (
    <>
      <SliderCurrencies
        marginBottom="L"
        onChange={(currency) => handleChange('currency', currency)}
        selected={form.currency}
      />

      <InputCurrency
        label={l10n.INITIAL_BALANCE}
        marginBottom="L"
        value={form.balance}
        vault={{ currency: form.currency }}
        onChange={(value) => handleChange('balance', value)}
      />

      <Input label={l10n.NAME} value={form.title} onChange={(value) => handleChange('title', value)} />
    </>
  );
};

FormVault.propTypes = {
  form: PropTypes.shape({}),
  showExchange: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export { FormVault };

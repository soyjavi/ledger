import PropTypes from 'prop-types';
import React from 'react';

import { useL10N } from '@context';
import { Input } from '@components/Input';
import { SliderCurrencies } from '@components/SliderCurrencies';

export const FormVault = ({ form = {}, onChange }) => {
  const l10n = useL10N();

  const handleField = (field, value) => {
    const next = { ...form, [field]: value };

    onChange({
      ...next,
      valid: next.currency !== undefined && next.title !== undefined,
    });
  };

  return (
    <>
      <SliderCurrencies onChange={(currency) => handleField('currency', currency)} selected={form.currency} />
      <Input
        currency={form.currency}
        label={l10n.INITIAL_BALANCE}
        marginVertical="M"
        onChange={(value) => handleField('balance', value)}
        value={form.balance}
      />
      <Input label={l10n.ACCOUNT_NAME} onChange={(value) => handleField('title', value)} value={form.title} />
    </>
  );
};

FormVault.propTypes = {
  form: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

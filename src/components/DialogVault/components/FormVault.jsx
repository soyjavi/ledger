import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { FLAGS } from '@assets';
import { useL10N, useStore } from '@context';
import { Option, OPTION_SIZE } from '@components/Option';
import { Input } from '@components/Input';

const { SPACE } = THEME;

const listCurrencies = (baseCurrency, rates) => [
  baseCurrency,
  ...Object.keys(rates).filter((currency) => currency !== baseCurrency),
];

export const FormVault = ({ form = {}, onChange, rates }) => {
  const l10n = useL10N();
  const store = useStore();
  const { baseCurrency } = store;

  const handleField = (field, value) => {
    const next = { ...form, [field]: value };

    onChange({
      ...next,
      valid: next.currency !== undefined && next.title !== undefined,
    });
  };

  return (
    <>
      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE}>
        {listCurrencies(baseCurrency, rates).map((currency, index) => (
          <Option
            caption={currency}
            image={FLAGS[currency]}
            key={index}
            marginRight="S"
            onPress={() => handleField('currency', currency)}
            selected={form.currency === currency}
          />
        ))}
      </Slider>
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
  rates: PropTypes.shape({}),
};

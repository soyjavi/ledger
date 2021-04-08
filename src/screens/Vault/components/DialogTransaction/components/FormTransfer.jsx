import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { C, currencyDecimals } from '@common';
import { InputCurrency, Option, OPTION_SIZE } from '@components';
import { useL10N, useStore } from '@context';

import { getVault, queryAvailableVaults } from '../modules';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;
const { SPACE } = THEME;

const FormTransaction = ({ form = {}, onChange, vault = {} }) => {
  const l10n = useL10N();
  const {
    settings: { baseCurrency },
    vaults,
    rates,
  } = useStore();

  const [selectVault, setSelectVault] = useState();

  const availableVaults = queryAvailableVaults(vaults, vault);

  useEffect(() => {
    if (form.to === undefined) {
      const [firstVault = {}] = availableVaults;
      onChange({ form: { destination: firstVault.hash, to: firstVault } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleField = (field, fieldValue) => {
    const next = { ...form, [field]: fieldValue };
    const from = getVault(vault.hash, vaults);
    const to = getVault(next.destination, vaults);
    let { exchange = 0, value = 0 } = next;

    if (next.destination && exchange === form.exchange) {
      const keys = Object.keys(rates);
      const lastRates = rates[keys[keys.length - 1]];

      if (from.currency === to.currency) exchange = value;
      else if (from.currency === baseCurrency) exchange = value * lastRates[to.currency];
      else if (to.currency === baseCurrency) exchange = value / lastRates[from.currency];
      else exchange = (value / lastRates[from.currency]) * lastRates[to.currency];

      exchange = parseFloat(exchange, 10).toFixed(currencyDecimals(exchange, to.currency));
    }

    onChange({
      form: { ...next, from, to, exchange },
      valid: next.value > 0 && next.destination !== undefined && next.exchange > 0,
    });
  };

  return (
    <>
      <InputCurrency
        marginBottom="L"
        type={EXPENSE}
        value={form.value}
        vault={vault}
        onChange={(value) => handleField('value', value)}
      />

      {selectVault ? (
        <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE} marginBottom="S">
          {availableVaults.map(({ currency, hash, title }) => (
            <Option
              currency={currency}
              key={hash}
              legend={title}
              marginRight="S"
              onPress={() => {
                handleField('destination', hash);
                setSelectVault(false);
              }}
              selected={hash === form.destination}
            />
          ))}
        </Slider>
      ) : (
        <InputCurrency
          currency={form.to ? form.to.currency : baseCurrency}
          label={l10n.GET}
          marginBottom="S"
          type={INCOME}
          value={form.to ? form.exchange : undefined}
          vault={getVault(form.destination, vaults)}
          onChange={(value) => handleField('exchange', value)}
          onVault={() => setSelectVault(true)}
        />
      )}
    </>
  );
};

FormTransaction.propTypes = {
  destination: PropTypes.string,
  form: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  vault: PropTypes.shape({}).isRequired,
};

export default FormTransaction;

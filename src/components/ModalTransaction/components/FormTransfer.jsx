import {
  // helpers
  SIZE,
  // components
  ScrollView,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { C, currencyDecimals, L10N } from '@common';
import { InputCurrency, Option, OPTION_SIZE } from '@components';
import { useStore } from '@context';

import { getVault, queryAvailableVaults } from '../helpers';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const FormTransaction = ({ form = {}, onChange, vault = {} }) => {
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
        type={EXPENSE}
        value={form.value}
        vault={vault}
        onChange={(value) => handleField('value', value)}
      />

      {selectVault ? (
        <ScrollView horizontal snapInterval={OPTION_SIZE} marginBottom={SIZE.M}>
          {availableVaults.map(({ currency, hash, title }) => (
            <Option
              currency={currency}
              key={hash}
              legend={title}
              onPress={() => {
                handleField('destination', hash);
                setSelectVault(false);
              }}
              selected={hash === form.destination}
            />
          ))}
        </ScrollView>
      ) : (
        <InputCurrency
          currency={form.to ? form.to.currency : baseCurrency}
          label={L10N.GET}
          marginBottom={SIZE.M}
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
  form: PropTypes.shape({}).isRequired,
  vault: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTransaction;

import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { colorOpacity, currencyDecimals } from '@common';
import { Input, Option, PriceFriendly, OPTION_SIZE } from '@components';
import { useL10N, useStore } from '@context';

import { getVault, queryAvailableVaults } from '../modules';

const { COLOR, SPACE } = THEME;

const FormTransaction = ({ form = {}, onChange, vault = {} }) => {
  const l10n = useL10N();
  const {
    settings: { baseCurrency },
    vaults,
    rates,
  } = useStore();

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
      <Input
        currency={vault.currency}
        label={l10n.SEND}
        marginBottom="L"
        maxValue={vault.currentBalance}
        onChange={(value) => handleField('value', value)}
        value={form.value}
      />

      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE} marginBottom="L">
        {queryAvailableVaults(vaults, vault.hash).map(({ currency, currentBalance, hash, title }) => (
          <Option
            key={hash}
            color={currency === baseCurrency ? colorOpacity(COLOR.BRAND) : undefined}
            currency={currency}
            legend={title}
            marginRight="S"
            onPress={() => handleField('destination', hash)}
            selected={hash === form.destination}
          >
            <PriceFriendly
              caption
              color={hash === form.destination ? COLOR.BACKGROUND : COLOR.TEXT}
              maskAmount={false}
              value={currentBalance}
              currency={currency}
            />
          </Option>
        ))}
      </Slider>

      <Input
        currency={form.to ? form.to.currency : baseCurrency}
        disabled={!form.to}
        label={l10n.GET}
        onChange={(value) => handleField('exchange', value)}
        value={form.to ? form.exchange : undefined}
      />
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

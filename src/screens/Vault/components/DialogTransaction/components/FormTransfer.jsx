import { func, shape, string } from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Icon, Slider } from 'reactor/components';

import { FLAGS } from '@assets';
import { currencyDecimals } from '@common';
import { Input, Option, PriceFriendly, OPTION_SIZE } from '@components';
import { useStore } from '@context';

import { getCurrency, getVault, queryAvailableVaults } from '../modules';

const { COLOR, SPACE } = THEME;

const FormTransaction = ({ form = {}, onChange, vault }) => {
  const { baseCurrency, vaults, rates } = useStore();

  const handleField = (field, fieldValue) => {
    const next = { ...form, [field]: fieldValue };
    const from = getVault(vault, vaults);
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
        currency={getCurrency(vault, vaults)}
        onChange={(value) => handleField('value', value)}
        value={form.value}
      />

      <Icon
        color={form.value <= 0 ? COLOR.LIGHTEN : undefined}
        marginVertical="S"
        value="arrow-down"
        size={SPACE.L}
        style={{ alignSelf: 'center' }}
      />

      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE}>
        {queryAvailableVaults(vaults, vault).map(({ currency, currentBalance, hash, title }) => (
          <Option
            key={hash}
            image={FLAGS[currency]}
            legend={title}
            marginRight="S"
            onPress={() => handleField('destination', hash)}
            selected={hash === form.destination}
          >
            <PriceFriendly caption color={COLOR.LIGHTEN} value={currentBalance} currency={currency} />
          </Option>
        ))}
      </Slider>

      <Icon
        color={!form.to ? COLOR.LIGHTEN : undefined}
        marginVertical="S"
        value="arrow-down"
        size={SPACE.L}
        style={{ alignSelf: 'center' }}
      />

      <Input
        currency={form.to ? form.to.currency : baseCurrency}
        disabled={!form.to}
        marginBottom="XL"
        onChange={(value) => handleField('exchange', value)}
        value={form.to ? form.exchange : undefined}
      />
    </>
  );
};

FormTransaction.propTypes = {
  destination: string,
  form: shape({}).isRequired,
  onChange: func.isRequired,
  vault: string.isRequired,
};

FormTransaction.defaultProps = {
  destination: undefined,
};

export default FormTransaction;

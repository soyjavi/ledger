import {
  // helpers
  ALIGN,
  COLOR,
  SIZE,
  styles,
  // components
  ScrollView,
  Text,
  Touchable,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { C, currencyDecimals, L10N } from '@common';
import { useStore } from '@context';

import { InputCurrency } from '../../InputCurrency';
import { Option, OPTION_SIZE } from '../../Option';
import { getVault, queryAvailableVaults } from '../helpers';
import { style } from './FormTransfer.style';

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

  const [selectVault, setSelectVault] = useState(false);

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
        <ScrollView horizontal snapInterval={OPTION_SIZE} style={style.slider}>
          {availableVaults.map(({ currency, hash, title }, index) => (
            <Option
              color={COLOR.GRAYSCALE_XL}
              currency={currency}
              key={hash}
              legend={title}
              selected={hash === form.destination}
              style={styles(
                style.card,
                index === 0 && style.firstCard,
                index === availableVaults.length - 1 && style.lastCard,
              )}
              onPress={() => {
                handleField('destination', hash);
                setSelectVault(false);
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <InputCurrency
          currency={form.to ? form.to.currency : baseCurrency}
          label={L10N.GET}
          marginBottom={SIZE.M}
          style={style.inputDestination}
          type={INCOME}
          value={form.to ? form.exchange : undefined}
          vault={getVault(form.destination, vaults)}
          onChange={(value) => handleField('exchange', value)}
        />
      )}

      <Touchable
        alignItems={ALIGN.CENTER}
        paddingVertical={SIZE.S}
        wide
        onPress={!selectVault ? () => setSelectVault(true) : undefined}
      >
        <Text color={COLOR.GRAYSCALE_L} detail level={2}>
          {selectVault ? L10N.CHOOSE : L10N.CHANGE_ACCOUNT_DESTINATION}
        </Text>
      </Touchable>
    </>
  );
};

FormTransaction.propTypes = {
  form: PropTypes.shape({}).isRequired,
  vault: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTransaction;

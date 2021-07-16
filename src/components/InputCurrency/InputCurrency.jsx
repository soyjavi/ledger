import {
  // helpers
  COLOR,
  SIZE,
  styles,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';

import { C } from '@common';
import { useStore } from '@context';

import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import { getLastRates } from './helpers';
import { style } from './InputCurrency.style';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const InputCurrency = ({
  backgroundColor = COLOR.GRAYSCALE_XL,
  label = '',
  type = EXPENSE,
  onChange,
  vault: { currency, currentBalance, title } = {},
  ...others
}) => {
  const { settings: { baseCurrency } = {}, rates } = useStore();

  const [exchange, setExchange] = useState();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    if (currency && currency !== baseCurrency) {
      const latestRates = getLastRates(rates);
      setExchange(latestRates[currency]);
    } else setExchange(undefined);
  }, [baseCurrency, currency, rates]);

  useEffect(() => {
    setValue(others.value);
  }, [others.value]);

  const handleChange = (value = '') => {
    let nextValue = value && value.toString().length > 0 ? value : undefined;

    if (currency && type === EXPENSE) {
      nextValue = parseFloat(nextValue, 10) > currentBalance ? currentBalance.toString() : nextValue;
      setValue(nextValue);
    }

    onChange && onChange(nextValue);
  };

  const active = focus || parseFloat(value, 10) > 0;

  return (
    <View
      backgroundColor={backgroundColor}
      borderColor={focus ? COLOR.CONTENT : backgroundColor}
      style={styles(style.container, others.style)}
      wide
    >
      {title && (
        <CurrencyLogo
          color={active ? COLOR.CONTENT : currency !== baseCurrency ? COLOR.GRAYSCALE_L : undefined}
          currency={currency}
          marginRight={SIZE.S}
        />
      )}
      <View>
        <Text color={!active ? COLOR.GRAYSCALE_L : undefined} detail level={2}>
          {(title || label).toUpperCase()}
        </Text>
        {title && (
          <PriceFriendly
            color={COLOR.GRAYSCALE_L}
            currency={currency}
            detail
            maskAmount={false}
            marginTop={SIZE.XXS}
            level={2}
            value={currentBalance}
          />
        )}
      </View>

      <View style={style.amounts}>
        <PriceFriendly
          color={!active ? COLOR.GRAYSCALE_L : undefined}
          currency={currency}
          level={2}
          maskAmount={false}
          value={value ? parseFloat(value, 10) : undefined}
        />
        {exchange && (
          <PriceFriendly
            color={COLOR.GRAYSCALE_L}
            detail
            currency={baseCurrency}
            level={2}
            maskAmount={false}
            value={parseFloat(others.value || 0, 10) / exchange}
          />
        )}
      </View>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        defaultValue={others.defaultValue}
        blurOnSubmit
        editable
        keyboardType="numeric"
        onBlur={() => setFocus(false)}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        onSubmitEditing={Keyboard.dismiss}
        style={style.input}
        value={others.value || 0}
      />
    </View>
  );
};

InputCurrency.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf([EXPENSE, INCOME]),
  vault: PropTypes.shape({}),
  onChange: PropTypes.func,
};

export { InputCurrency };

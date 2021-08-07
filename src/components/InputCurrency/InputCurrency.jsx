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

import { useStore } from '@context';

import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import { getLastRates } from './helpers';
import { style } from './InputCurrency.style';

const InputCurrency = ({
  backgroundColor = COLOR.GRAYSCALE_XL,
  label = '',
  onChange,
  vault: { currency, currentBalance, title } = {},
  ...others
}) => {
  const { settings: { baseCurrency } = {}, rates } = useStore();

  const [exchange, setExchange] = useState();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (currency && currency !== baseCurrency) {
      const latestRates = getLastRates(rates);
      setExchange(latestRates[currency]);
    } else setExchange(undefined);
  }, [baseCurrency, currency, rates]);

  const handleChange = (value = '') => {
    if (isNaN(value) || value.length === 0) return onChange(undefined);
    onChange(value);
  };

  const active = focus || parseFloat(others.value, 10) > 0;

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
          value={others.value ? parseFloat(others.value, 10) : undefined}
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
        autoComplete="off"
        autoCorrect={false}
        blurOnSubmit
        editable
        keyboardType="numeric"
        onBlur={() => setFocus(false)}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        onSubmitEditing={Keyboard.dismiss}
        style={style.input}
        value={others.value ? others.value.toString() : ''}
      />
    </View>
  );
};

InputCurrency.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string,
  vault: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
};

export { InputCurrency };

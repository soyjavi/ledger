import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  Icon,
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';

import { C } from '@common';
import { useStore } from '@context';

import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import { style } from './InputCurrency.style';
import { getLastRates } from './helpers';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const InputCurrency = ({
  color,
  disabled,
  label = '',
  type = EXPENSE,
  onChange,
  onVault,
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

  const active = !disabled && (focus || parseFloat(value, 10) > 0);

  return (
    <View
      {...others}
      borderColor={active ? COLOR.CONTENT : COLOR.GRAYSCALE_XL}
      customStyle={[style.container, others.customStyle]}
      wide
    >
      <View customStyle={style.content} flexDirection={FLEX_DIRECTION.ROW}>
        <View flexDirection={FLEX_DIRECTION.COL}>
          <Touchable onPress={!disabled ? onVault : undefined}>
            <View customStyle={style.label}>
              {title && (
                <CurrencyLogo
                  color={active ? COLOR.CONTENT : currency !== baseCurrency ? COLOR.GRAYSCALE_XL : undefined}
                  currency={currency}
                  marginRight={SIZE.XS}
                />
              )}
              <Text color={!active ? COLOR.GRAYSCALE_XL : undefined} detail pointerEvents="none">
                {(title || label).toUpperCase()}
              </Text>
            </View>

            {title && (
              <Row>
                <PriceFriendly
                  color={COLOR.GRAYSCALE_XL}
                  currency={currency}
                  detail
                  label="Balance: "
                  value={currentBalance}
                />
                {onVault && !disabled && (
                  <Icon color={COLOR.GRAYSCALE_XL} marginLeft="XS" marginTop="XXS" size={SPACE.S} value="arrow-down" />
                )}
              </Row>
            )}
          </Touchable>
        </View>

        <View alignItems={ALIGN.END} flex={SIZE.XS} flexDirection={FLEX_DIRECTION.COL} pointerEvents="none">
          <PriceFriendly
            color={!active ? COLOR.GRAYSCALE_XL : undefined}
            currency={currency}
            value={value ? parseFloat(value, 10) : undefined}
          />
          {exchange && (
            <PriceFriendly
              color={COLOR.GRAYSCALE_XL}
              detail
              currency={baseCurrency}
              value={parseFloat(others.value || 0, 10) / exchange}
            />
          )}
        </View>
      </View>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        defaultValue={others.defaultValue}
        disabled={disabled}
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
  color: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.oneOf([EXPENSE, INCOME]),
  vault: PropTypes.shape({}),
  onChange: PropTypes.func,
  onVault: PropTypes.func,
};

export { InputCurrency };

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Row, Text, View } from 'reactor/components';
import { format } from 'reactor/components/Price/modules';

import { C, currencyDecimals, getLastRates } from '@common';
import { useStore } from '@context';

import styles from './Input.style';

const { SYMBOL } = C;
const { COLOR } = THEME;

const LEFT_SYMBOLS = ['$', '£'];

export const Input = ({
  currency,
  keyboard = 'default',
  label,
  maxLength,
  onChange,
  secure,
  showExchange,
  ...others
}) => {
  const { baseCurrency, rates } = useStore();

  const [exchange, setExchange] = useState();
  const [value, setValue] = useState();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (showExchange && currency && currency !== baseCurrency) {
      const lastRates = getLastRates(rates);
      setExchange(
        format({
          value: lastRates[currency],
          fixed: currencyDecimals(value, currency),
        }),
      );
    } else setExchange(undefined);
  }, [currency]);

  useEffect(() => {
    setValue(others.value);
  }, [others.value]);

  const handleChange = (value = '') => {
    const nextValue = value && value.toString().length > 0 ? value : undefined;

    if (currency) setValue(nextValue);
    onChange && onChange(currency ? parseFloat(nextValue || 0, 10) : nextValue);
  };

  const symbol = SYMBOL[currency];
  const symbolProps = {
    children: SYMBOL[currency],
    color: !value && !focus ? COLOR.LIGHTEN : undefined,
    marginHorizontal: 'XS',
    subtitle: true,
  };

  return (
    <View {...others} style={[styles.container, others.style]}>
      <Row justify="center" marginBottom="XS  ">
        <Text caption color={COLOR.LIGHTEN}>
          {(others.value || currency) && label ? label : ' '}
        </Text>
      </Row>
      <Row justify="center" style={[styles.content, focus && styles.focus]}>
        {currency && (
          <>
            {LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
            <Text headline color={symbolProps.color} style={styles.value}>
              {value || '0'}
            </Text>
            {!LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
          </>
        )}

        <TextInput
          defaultValue={others.defaultValue}
          disabled={others.disabled}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          editable
          keyboardType={currency ? 'numeric' : keyboard}
          maxLength={maxLength}
          onBlur={() => setFocus(false)}
          onChangeText={handleChange}
          onFocus={() => setFocus(true)}
          placeholder={others.placeholder || label}
          placeholderTextColor={COLOR.LIGHTEN}
          secureTextEntry={secure}
          style={[styles.input, currency ? styles.inputCurrency : styles.inputText]}
          underlineColorAndroid="transparent"
          value={others.value ? others.value.toString() : ''}
        />
      </Row>
      {exchange && (
        <Row justify="center" marginTop="XS">
          <Text bold caption color={COLOR.LIGHTEN}>
            {`1 ${baseCurrency} = ${exchange} ${currency}`}
          </Text>
        </Row>
      )}
    </View>
  );
};

Input.propTypes = {
  currency: PropTypes.string,
  keyboard: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  secure: PropTypes.bool,
  showExchange: PropTypes.bool,
};

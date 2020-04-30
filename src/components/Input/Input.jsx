import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { THEME } from '../../reactor/common';
import { Col, Row, Text } from '../../reactor/components';
import { format } from '../../reactor/components/Price/modules';

import { C, currencyDecimals, getLastRates } from '../../common';
import { useStore } from '../../context';
import styles from './Input.style';

const { SYMBOL } = C;
const { COLOR } = THEME;

const LEFT_SYMBOLS = ['$', '£'];

export const Input = ({ currency, onChange, ...others }) => {
  const { baseCurrency, rates } = useStore();

  const [exchange, setExchange] = useState();
  const [value, setValue] = useState();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setExchange(
      currency && currency !== baseCurrency
        ? format({
            value: lastRates[currency],
            fixed: currencyDecimals(value, currency),
          })
        : undefined,
    );
  }, [currency]);

  useEffect(() => {
    setValue(others.value);
  }, [others.value]);

  const handleChange = (value) => {
    if (currency) setValue(value);
    onChange && onChange(currency ? parseFloat(value || 0, 10) : value);
  };

  const symbol = SYMBOL[currency];
  const symbolProps = {
    children: SYMBOL[currency],
    color: !value && !focus ? COLOR.LIGHTEN : undefined,
    marginHorizontal: 'XS',
    subtitle: true,
  };

  const lastRates = getLastRates(rates);

  return (
    <Col {...others}>
      <Row _align="center" justify="center" style={[styles.content, focus && styles.focus]}>
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
          keyboardType={currency ? 'numeric' : 'text'}
          onBlur={() => setFocus(false)}
          onChangeText={handleChange}
          onFocus={() => setFocus(true)}
          placeholder={others.placeholder}
          placeholderTextColor={COLOR.LIGHTEN}
          style={[styles.input, currency ? styles.inputCurrency : styles.inputText]}
          underlineColorAndroid="transparent"
          value={others.value}
        />
      </Row>
      {exchange && (
        <Row justify="center" marginTop="XS">
          <Text bold caption color={COLOR.LIGHTEN}>
            {`1 ${baseCurrency} = ${exchange} ${currency}`}
          </Text>
        </Row>
      )}
    </Col>
  );
};

Input.propTypes = {
  currency: PropTypes.string,
  onChange: PropTypes.func,
};

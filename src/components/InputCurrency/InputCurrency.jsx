import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Col, Icon, Row, Text, Touchable } from 'reactor/components';

import { useStore } from '@context';

import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import styles from './InputCurrency.style';
import { getLastRates } from './modules';

const { COLOR, SPACE } = THEME;

const InputCurrency = ({
  disabled,
  label = '',
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

    if (currency && !onVault) {
      nextValue = parseFloat(nextValue, 10) > currentBalance ? currentBalance.toString() : nextValue;
      setValue(nextValue);
    }

    onChange && onChange(nextValue);
  };

  const color = !focus && (disabled || value === undefined) ? COLOR.LIGHTEN : undefined;

  return (
    <Row {...others} align="center" style={[styles.container, others.style]}>
      <Col>
        <Touchable rippleColor={COLOR.LIGHTEN} onPress={!disabled ? onVault : undefined}>
          <Row marginBottom="XS">
            {title && (
              <CurrencyLogo
                color={currency !== baseCurrency ? COLOR.LIGHTEN : undefined}
                currency={currency}
                marginRight="XS"
                size="S"
              />
            )}
            <Text color={color}>{(title || label).toUpperCase()}</Text>
          </Row>
          {title && (
            <Row>
              <PriceFriendly
                caption
                color={COLOR.LIGHTEN}
                currency={currency}
                label="Balance: "
                value={currentBalance}
              />
              {onVault && !disabled && (
                <Icon color={COLOR.LIGHTEN} marginLeft="XS" marginTop="XXS" size={SPACE.S} value="arrow-down" />
              )}
            </Row>
          )}
        </Touchable>
      </Col>

      <Col align="end">
        <Col align="end">
          <PriceFriendly
            bold
            color={color}
            currency={currency}
            pointerEvents="none"
            style={styles.input}
            value={value ? parseFloat(value, 10) : undefined}
          />
          {exchange && (
            <PriceFriendly
              caption
              color={COLOR.LIGHTEN}
              pointerEvents="none"
              currency={baseCurrency}
              value={parseFloat(others.value || 0, 10) / exchange}
            />
          )}
        </Col>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={others.defaultValue}
          disabled={others.disabled}
          blurOnSubmit
          editable
          keyboardType="numeric"
          onBlur={() => setFocus(false)}
          onChangeText={handleChange}
          onFocus={() => setFocus(true)}
          style={styles.textInput}
          value={others.value || 0}
        />
      </Col>
    </Row>
  );
};

InputCurrency.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onVault: PropTypes.func,
  vault: PropTypes.shape({}),
};

export { InputCurrency };

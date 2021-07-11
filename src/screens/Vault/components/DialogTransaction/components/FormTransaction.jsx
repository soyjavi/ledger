import {
  // helpers
  COLOR,
  SIZE,
  // components
  ScrollView,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { getIcon, L10N } from '@common';
import { Input, InputCurrency, Option, OPTION_SIZE } from '@components';

import { queryCategories } from '../modules';
import { style } from './FormTransaction.style';

const FormTransaction = ({ color, currency, form = {}, onChange, type, vault = {} }) => {
  const {
    screen: { width },
  } = useDevice();

  const handleField = (field, fieldValue) => {
    const next = { ...form, [field]: fieldValue };

    onChange({
      form: next,
      valid: next.category !== undefined && next.title !== '' && next.value > 0,
    });
  };

  return (
    <>
      <ScrollView horizontal snapInterval={OPTION_SIZE} style={style.slider} width={width}>
        {queryCategories({ type }).map((item, index) => (
          <Option
            color={COLOR.GRAYSCALE_XL}
            legend={item.caption}
            key={item.key}
            icon={getIcon({ type, category: item.key })}
            selected={form.category === item.key}
            style={index === 0 ? style.firstCard : style.card}
            onPress={() => handleField('category', item.key)}
          />
        ))}
      </ScrollView>

      <InputCurrency
        color={color}
        currency={currency}
        marginBottom={SIZE.M}
        type={type}
        onChange={(value) => handleField('value', value)}
        value={form.value}
        vault={vault}
      />

      <Input
        color={color}
        label={L10N.CONCEPT}
        marginBottom={SIZE.M}
        onChange={(value) => handleField('title', value)}
        value={form.title}
      />
    </>
  );
};

FormTransaction.propTypes = {
  color: PropTypes.string,
  currency: PropTypes.string,
  form: PropTypes.shape({}).isRequired,
  type: PropTypes.number,
  vault: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTransaction;

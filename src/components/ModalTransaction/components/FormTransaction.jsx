import {
  // helpers
  COLOR,
  SIZE,
  styles,
  // components
  ScrollView,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { getIcon, L10N } from '@common';

import { Input } from '../../Input';
import { InputCurrency } from '../../InputCurrency';
import { Option, OPTION_SIZE } from '../../Option';
import { queryCategories } from '../helpers';
import { style } from './FormTransaction.style';

const FormTransaction = ({ form = {}, onChange, type, vault = {} }) => {
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

  const categories = queryCategories({ type });
  const isEmpty = Object.keys(form).length === 0;

  return (
    <>
      <ScrollView
        animated={!isEmpty}
        horizontal
        scrollTo={isEmpty ? 0 : undefined}
        snapInterval={OPTION_SIZE}
        style={style.slider}
        width={width}
      >
        {categories.map((item, index) => (
          <Option
            color={COLOR.GRAYSCALE_XL}
            legend={item.caption}
            key={item.key}
            icon={getIcon({ type, category: item.key })}
            selected={form.category === item.key}
            style={styles(
              style.card,
              index === 0 && style.firstCard,
              index === categories.length - 1 && style.lastCard,
            )}
            onPress={() => handleField('category', item.key)}
          />
        ))}
      </ScrollView>

      <InputCurrency
        currency={vault.currency}
        marginBottom={SIZE.M}
        onChange={(value) => handleField('value', value)}
        value={form.value}
        vault={vault}
      />

      <Input
        label={L10N.CONCEPT}
        marginBottom={SIZE.M}
        onChange={(value) => handleField('title', value)}
        value={form.title}
      />
    </>
  );
};

FormTransaction.propTypes = {
  form: PropTypes.shape({}).isRequired,
  type: PropTypes.number,
  vault: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTransaction;

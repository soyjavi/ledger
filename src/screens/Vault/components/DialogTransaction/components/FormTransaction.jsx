import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { C } from '@common';
import { Input, InputCurrency, Option, OPTION_SIZE } from '@components';
import { useL10N } from '@context';

import { queryCategories } from '../modules';

const { CATEGORY_ICON } = C;
const { SPACE } = THEME;

const FormTransaction = ({ color, currency, form = {}, onChange, type, vault = {} }) => {
  const l10n = useL10N();

  const handleField = (field, fieldValue) => {
    const next = { ...form, [field]: fieldValue };

    onChange({
      form: next,
      valid: next.category !== undefined && next.title !== '' && next.value > 0,
    });
  };

  return (
    <>
      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE} marginBottom="L">
        {queryCategories({ l10n, type }).map((item) => (
          <Option
            colorSelected={color}
            legend={item.caption}
            key={item.key}
            icon={CATEGORY_ICON[type][item.key]}
            marginRight="S"
            onPress={() => handleField('category', item.key)}
            selected={form.category === item.key}
          />
        ))}
      </Slider>

      <InputCurrency
        color={color}
        currency={currency}
        marginBottom="L"
        type={type}
        onChange={(value) => handleField('value', value)}
        value={form.value}
        vault={vault}
      />

      <Input
        color={color}
        label={l10n.CONCEPT}
        marginBottom="L"
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

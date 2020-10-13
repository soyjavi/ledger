import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { C } from '@common';
import { Input, Option, OPTION_SIZE } from '@components';
import { useL10N } from '@context';

import { queryCategories } from '../modules';

const {
  CATEGORY_ICON,
  TX: {
    TYPE: { EXPENSE },
  },
} = C;
const { SPACE } = THEME;

const FormTransaction = ({ currency, form = {}, onChange, type, vault: { currentBalance = 0 } = {} }) => {
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
      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE} marginBottom="M">
        {queryCategories({ l10n, type }).map((item) => (
          <Option
            legend={item.caption}
            key={item.key}
            icon={CATEGORY_ICON[type][item.key]}
            marginRight="S"
            onPress={() => handleField('category', item.key)}
            selected={form.category === item.key}
          />
        ))}
      </Slider>

      <Input
        currency={currency}
        label={l10n.AMOUNT}
        marginBottom="L"
        maxValue={type === EXPENSE ? currentBalance : undefined}
        onChange={(value) => handleField('value', value)}
        value={form.value}
      />

      <Input
        label={l10n.CONCEPT}
        marginBottom="L"
        onChange={(value) => handleField('title', value)}
        value={form.title}
      />
    </>
  );
};

FormTransaction.propTypes = {
  currency: PropTypes.string,
  form: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.number,
  vault: PropTypes.shape({}).isRequired,
};

export default FormTransaction;

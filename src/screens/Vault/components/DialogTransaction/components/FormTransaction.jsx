import { func, number, shape, string } from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Slider } from 'reactor/components';

import { C, getIconCategory } from '@common';
import { Input, Option, OPTION_SIZE } from '@components';
import { useL10N } from '@context';

import { queryCategories } from '../modules';

const {
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
      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE} marginTop="XS" marginBottom="M">
        {queryCategories({ l10n, type }).map((item) => (
          <Option
            legend={item.caption}
            key={item.key}
            icon={getIconCategory({ type, category: item.key })}
            marginRight="S"
            onPress={() => handleField('category', item.key)}
            selected={form.category === item.key}
          />
        ))}
      </Slider>

      <Input
        currency={currency}
        label={l10n.AMOUNT}
        marginVertical="M"
        maxValue={type === EXPENSE ? currentBalance : undefined}
        onChange={(value) => handleField('value', value)}
        value={form.value}
      />

      <Input
        label={l10n.CONCEPT}
        marginBottom="M"
        onChange={(value) => handleField('title', value)}
        value={form.title}
      />
    </>
  );
};

FormTransaction.propTypes = {
  currency: string,
  form: shape({}).isRequired,
  onChange: func.isRequired,
  type: number,
  vault: shape({}).isRequired,
};

export default FormTransaction;

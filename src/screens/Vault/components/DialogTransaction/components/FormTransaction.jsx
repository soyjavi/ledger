import { func, number, shape, string } from 'prop-types';
import React from 'react';
import { Slider } from 'reactor/components';
import { THEME } from 'reactor/common';

import { getIconCategory } from '@common';
import { Input, Option, OPTION_SIZE } from '@components';
import { useL10N } from '@context';

import { queryCategories } from '../modules';

const { SPACE } = THEME;

const FormTransaction = ({ form = {}, onChange, type, ...inherit }) => {
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
            family="MaterialCommunityIcons"
            marginRight="S"
            onPress={() => handleField('category', item.key)}
            selected={form.category === item.key}
          />
        ))}
      </Slider>

      <Input
        currency={inherit.currency}
        marginBottom="M"
        onChange={(value) => handleField('value', value)}
        placeholder={l10n.AMOUNT}
        value={form.value}
      />

      <Input
        marginBottom="M"
        onChange={(value) => handleField('title', value)}
        placeholder={l10n.CONCEPT}
        value={form.title}
      />
    </>
  );
};

FormTransaction.propTypes = {
  category: string,
  form: shape({}).isRequired,
  onChange: func.isRequired,
  type: number.isRequired,
};

export default FormTransaction;

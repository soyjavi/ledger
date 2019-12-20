import {
  func, number, shape, string,
} from 'prop-types';
import React, { Fragment } from 'react';

import {
  FORM, getIconCategory, setCurrency, translate,
} from '../../../../../common';
import { CardOption } from '../../../../../components';
import { useL10N } from '../../../../../context';
import { Form, Slider, Text } from '../../../../../reactor/components';
import { THEME } from '../../../../../reactor/common';
import { queryCategories } from '../modules';

import styles, { CARD_WIDTH } from '../DialogTransaction.style';

const { SPACE } = THEME;

const FormTransaction = (props) => {
  const {
    color, form, onChange, type, ...inherit
  } = props;

  const l10n = useL10N();

  const handleChange = (values = {}) => {
    const { category, form: { title = '', value } } = { ...props, ...values };

    onChange({
      ...values,
      type,
      valid: category !== undefined && title !== '' && value > 0,
    });
  };

  return (
    <Fragment>
      <Text subtitle>{l10n.CATEGORY}</Text>
      <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} style={styles.cards}>
        { queryCategories({ l10n, type }).map((item) => (
          <CardOption
            key={item.key}
            color={color}
            icon={getIconCategory({ type, category: item.key })}
            onPress={() => handleChange({ category: item.key })}
            selected={props.category === item.key}
            style={styles.card}
            title={item.caption}
          />
        ))}
      </Slider>

      <Form
        attributes={setCurrency(translate(FORM.TRANSACTION, l10n), inherit.currency)}
        color={color}
        onChange={(value) => handleChange({ form: value })}
        value={form}
      />
    </Fragment>
  );
};

FormTransaction.propTypes = {
  category: string,
  color: string.isRequired,
  form: shape({}).isRequired,
  onChange: func.isRequired,
  type: number.isRequired,
};

FormTransaction.defaultProps = {
  category: undefined,
};

export default FormTransaction;

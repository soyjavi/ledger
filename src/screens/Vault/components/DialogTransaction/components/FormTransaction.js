import {
  func, number, shape, string,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

import {
  FORM, getIconCategory, setCurrency, translate,
} from '../../../../../common';
import { CardOption } from '../../../../../components';
import { Consumer } from '../../../../../context';
import { Form, Slider, Text } from '../../../../../reactor/components';
import { THEME } from '../../../../../reactor/common';
import { queryCategories } from '../modules';

import styles, { CARD_WIDTH } from '../DialogTransaction.style';

const { SPACE } = THEME;

class FormTransaction extends PureComponent {
  static propTypes = {
    category: string,
    color: string.isRequired,
    form: shape({}).isRequired,
    onChange: func.isRequired,
    type: number.isRequired,
  };

  static defaultProps = {
    category: undefined,
  };

  _onChange = (values = {}) => {
    const { props: { onChange, ...props } } = this;

    const { category, form: { title = '', value } } = { ...props, ...values };
    onChange({
      ...values,
      valid: category !== undefined && title !== '' && value > 0,
    });
  }

  render() {
    const {
      _onChange,
      props: {
        category, color, form, type, ...inherit
      },
    } = this;

    return (
      <Consumer>
        { ({ l10n }) => (
          <Fragment>
            <Text subtitle level={3}>{l10n.CATEGORY}</Text>
            <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} style={styles.cards}>
              { queryCategories({ l10n, type }).map((item) => (
                <CardOption
                  key={item.key}
                  color={color}
                  icon={getIconCategory({ type, category: item.key })}
                  onPress={() => _onChange({ category: item.key })}
                  selected={category === item.key}
                  style={styles.card}
                  title={item.caption}
                />
              ))}
            </Slider>

            <Form
              attributes={setCurrency(translate(FORM.TRANSACTION, l10n), inherit.currency)}
              color={color}
              onChange={(value) => _onChange({ form: value })}
              value={form}
            />
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default FormTransaction;

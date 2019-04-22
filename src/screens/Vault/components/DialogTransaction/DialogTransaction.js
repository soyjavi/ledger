import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { CATEGORIES } from '../../../../assets';
import {
  C, FORM, setCurrency, translate,
} from '../../../../common';
import { Consumer } from '../../../../context';
import { CardOption, MapStaticImage } from '../../../../components';

import { THEME } from '../../../../reactor/common';
import {
  Button, Dialog, Form, Slider, Text,
} from '../../../../reactor/components';
import { getLocation, queryCategories } from './modules';

import styles, { CARD_WIDTH } from './DialogTransaction.style';

const { COLOR, SPACE } = THEME;
const { TX: { TYPE: { EXPENSE } } } = C;

class DialogTransaction extends PureComponent {
  static propTypes = {
    currency: string.isRequired,
    onClose: func.isRequired,
    type: number.isRequired,
    vault: string,
    visible: bool,
  };

  static defaultProps = {
    vault: undefined,
    visible: false,
  };

  state = {
    busy: false,
    category: undefined,
    coords: undefined,
    form: {},
    location: false,
    place: undefined,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;

    if (visible === true && visible !== props.visible) {
      this.setState({
        category: undefined,
        coords: undefined,
        form: { title: '' },
        location: false,
        place: undefined,
      });
    }
  }

  _onCategory = category => this.setState({ category });

  _onChange = form => this.setState({ form });

  _getLocation = (getLocationAsync) => {
    getLocation(this, getLocationAsync);
  }

  _onSubmit = async ({ onTransaction }) => {
    const {
      props: { onClose, type, vault },
      state: {
        category, coords = {}, form: { value, title = '' }, place,
      },
    } = this;

    this.setState({ busy: true });
    const response = await onTransaction({
      category,
      title,
      type,
      value: parseFloat(value, 10),
      vault,
      place,
      ...coords,
    });

    this.setState({ busy: false });
    if (response) onClose();
  }

  render() {
    const {
      _getLocation, _onCategory, _onChange, _onSubmit,
      props: {
        currency, onClose, type, visible,
      },
      state: {
        busy, category, coords, form, location, place,
      },
    } = this;
    const color = type === EXPENSE ? COLOR.EXPENSES : COLOR.INCOMES;
    const valid = category !== undefined && form.title !== '' && form.value > 0;

    return (
      <Consumer>
        { ({ events: { getLocationAsync }, l10n, store }) => (
          <Dialog
            onClose={onClose}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.NEW} ${type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}`}
            visible={visible}
          >
            <Text lighten level={2}>
              {type === EXPENSE ? l10n.EXPENSE_CAPTION : l10n.INCOME_CAPTION}
            </Text>
            <View style={styles.form}>
              <Text subtitle level={3}>{l10n.CATEGORY}</Text>
              <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} steps={3} style={styles.cards}>
                { queryCategories({ l10n, type }).map(item => (
                  <CardOption
                    key={item.key}
                    color={color}
                    icon={CATEGORIES[type][item.key]}
                    onPress={() => _onCategory(item.key)}
                    selected={category === item.key}
                    style={styles.card}
                    title={item.caption}
                  />
                ))}
              </Slider>

              <Form
                attributes={setCurrency(translate(FORM.TRANSACTION, l10n), currency)}
                color={color}
                onChange={_onChange}
                value={form}
              />

              { getLocationAsync && (
                <View>
                  { visible && location === false && _getLocation(getLocationAsync) }
                  <MapStaticImage {...coords} zoom={coords ? 14.5 : 12} style={styles.location} />
                  <Text level={2} lighten>{place || l10n.LOADING_PLACE}</Text>
                </View>
              )}
            </View>

            <Button
              activity={busy}
              color={color}
              disabled={busy || !valid}
              onPress={() => _onSubmit(store)}
              shadow
              style={styles.button}
              title={!busy ? l10n.SAVE : undefined}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransaction;

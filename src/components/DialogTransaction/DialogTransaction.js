import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C, translate } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import MapStaticImage from '../MapStaticImage';
import { getLocation, hydrateTransaction } from './modules';

import styles from './DialogTransaction.style';

const { COLOR } = THEME;
const { TX: { TYPE: { EXPENSE } } } = C;

class DialogTransaction extends PureComponent {
  static propTypes = {
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
    coords: undefined,
    form: {},
    location: false,
    place: undefined,
    valid: false,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;

    if (visible === true && visible !== props.visible) {
      this.setState({
        coords: undefined,
        form: { title: '' },
        location: false,
        place: undefined,
      });
    }
  }

  _onChange = form => this.setState({ form });

  _getLocation = (getLocationAsync) => {
    getLocation(this, getLocationAsync);
  }

  _onValid = valid => this.setState({ valid })

  _onSubmit = async ({ l10n: { CATEGORIES }, store: { onTransaction } }) => {
    const {
      props: { onClose, type, vault },
      state: { coords = {}, form: { category, value, title = '' }, place },
    } = this;

    this.setState({ busy: true });
    const response = await onTransaction({
      category: category
        ? parseInt(Object.keys(CATEGORIES[type]).find(key => CATEGORIES[type][key] === category), 10)
        : 1,
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
      _getLocation, _onChange, _onSubmit, _onValid,
      props: { onClose, type, visible },
      state: {
        busy, coords, form, location, place, valid,
      },
    } = this;
    const color = type === EXPENSE ? COLOR.EXPENSES : COLOR.INCOMES;

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
              <Form
                attributes={translate(hydrateTransaction({ l10n, type }), l10n)}
                color={color}
                onValid={_onValid}
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
              onPress={() => _onSubmit({ l10n, store })}
              shadow
              style={styles.button}
              title={l10n.SAVE}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransaction;

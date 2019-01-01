import {
  bool, func, number, string,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

import { C, fetch, translate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Switch, Text,
} from '../../reactor/components';
import MapStaticImage from '../MapStaticImage';
import { hydrateTransaction } from './modules';

import styles from './DialogTransaction.style';

const { COLORS, TX: { TYPE: { EXPENSE } } } = C;

class DialogTransaction extends PureComponent {
  static propTypes = {
    color: string,
    onClose: func.isRequired,
    type: number.isRequired,
    visible: bool,
  };

  static defaultProps = {
    color: COLORS.TEXT,
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

  _onChangeLocation = async (location, getLocationAsync) => {
    this.setState({ coords: undefined, location, place: undefined });

    if (location) {
      const coords = await getLocationAsync();
      const { place } = await fetch({
        service: `place?latitude=${coords.latitude}&longitude=${coords.longitude}`,
      });
      this.setState({ coords, place });
    }
  }

  _onValid = valid => this.setState({ valid })

  _onSubmit = async ({ l10n: { CATEGORIES }, store: { onTransaction } }) => {
    const {
      props: { onClose, type, vault },
      state: { coords, form: { category, value, title = '' }, place },
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
      _onChange, _onChangeLocation, _onSubmit, _onValid,
      props: {
        color, onClose, type, visible,
      },
      state: {
        busy, coords, form, location, place, valid,
      },
    } = this;

    return (
      <Consumer>
        { ({ events: { getLocationAsync }, l10n, store }) => (
          <Dialog visible={visible} style={styles.frame} styleContainer={styles.dialog}>
            <Text color={color} headline level={5} style={styles.title}>
              {`${l10n.NEW} ${type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}`}
            </Text>
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
                <Fragment>
                  <Switch
                    color={color}
                    label={l10n.SAVE_LOCATION}
                    onChange={value => _onChangeLocation(value, getLocationAsync)}
                    value={location}
                  />
                  { location && (
                    <Fragment>
                      <MapStaticImage {...coords} zoom={coords ? 14.5 : 12} />
                      <Text level={2} lighten>{place || l10n.LOADING_PLACE}</Text>
                    </Fragment>)}
                </Fragment>)}
            </View>

            <View style={styles.buttons}>
              <Button
                color={color}
                outlined
                onPress={onClose}
                rounded
                style={styles.button}
                title={l10n.CANCEL}
              />
              <Button
                activity={busy}
                color={color}
                disabled={busy || !valid || (location && !place)}
                onPress={() => _onSubmit({ l10n, store })}
                rounded
                shadow
                style={styles.button}
                title={l10n.SAVE}
              />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransaction;

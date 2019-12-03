import { bool, func, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';

import { C } from '../../../../common';
import { Consumer } from '../../../../context';
import { CardOption, HeatMap } from '../../../../components';
import { FormTransaction, FormTransfer } from './components';
import { getLocation, onTransaction, onTransfer } from './modules';

import styles from './DialogTransaction.style';

const { COLOR } = THEME;
const { TX: { TYPE: { EXPENSE, TRANSFER } } } = C;

const DEFAULTS = {
  busy: false,
  category: undefined,
  coords: undefined,
  form: {},
  location: false,
  place: undefined,
  type: EXPENSE,
  valid: false,
};

class DialogTransaction extends PureComponent {
  static propTypes = {
    currency: string.isRequired,
    onClose: func.isRequired,
    vault: string,
    visible: bool,
  };

  static defaultProps = {
    vault: undefined,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = { ...DEFAULTS };
  }

  componentWillReceiveProps({ visible }) {
    const { props } = this;

    if (visible && visible !== props.visible) this.setState(DEFAULTS);
  }

  _getLocation = (getLocationAsync) => {
    getLocation(this, getLocationAsync);
  }

  _onChange = (value) => this.setState(value);

  _onType = (type) => this.setState({
    category: undefined, form: {}, type, valid: false,
  });

  _onSubmit = async (store) => {
    const { props: { onClose }, state: { type } } = this;

    this.setState({ busy: true });
    const method = type === TRANSFER ? onTransfer : onTransaction;
    const tx = await method(this, store);
    if (tx) onClose();
    this.setState({ busy: false });
  }

  render() {
    const {
      _getLocation, _onChange, _onSubmit, _onType,
      props: {
        currency, onClose, visible, ...inherit
      },
      state: {
        busy, coords, location, place, type = EXPENSE, valid,
      },
    } = this;
    let color = COLOR.TRANSFER;
    if (type !== TRANSFER) color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;
    const formProps = {
      ...this.props, ...this.state, color, onChange: _onChange,
    };

    return (
      <Consumer>
        { ({ events: { getLocationAsync }, l10n, store }) => (
          <Dialog
            {...inherit}
            highlight
            onClose={onClose}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.NEW} ${l10n.TRANSACTION}`}
            visible={visible}
          >
            <Text subtitle>{l10n.TYPE}</Text>
            <View style={styles.cards}>
              { [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER].map((option, index) => (
                <CardOption
                  key={option}
                  color={color}
                  onPress={() => _onType(index)}
                  selected={type === index}
                  style={[styles.cardOption, index === 2 && styles.cardLast]}
                  title={option}
                />
              ))}
            </View>
            <View style={styles.form}>
              { type !== TRANSFER ? <FormTransaction {...formProps} /> : <FormTransfer {...formProps} /> }

              { getLocationAsync && (
                <View>
                  { visible && location === false && _getLocation(getLocationAsync) }
                  <HeatMap color={color} points={coords ? [[coords.longitude, coords.latitude]] : undefined} />
                  <Text lighten>{place || l10n.LOADING_PLACE}</Text>
                </View>
              )}
            </View>

            <Button
              activity={busy}
              color={color || COLOR.PRIMARY}
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

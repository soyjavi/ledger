import { bool, func, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { setCurrency, translate } from '../../../../common';
import { CardOption, PriceFriendly } from '../../../../components';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import {
  Button, Dialog, Form, Slider, Text,
} from '../../../../reactor/components';
import { hydrate, onTransfer, queryAvailableVaults } from './modules';

import styles, { CARD_WIDTH } from './DialogTransfer.style';

const { COLOR, SPACE } = THEME;

class DialogTransfer extends PureComponent {
  static propTypes = {
    onClose: func.isRequired,
    vault: string.isRequired,
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    busy: false,
    destination: undefined,
    form: {},
    valid: false,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;
    if (visible === true && visible !== props.visible) this.setState({ form: { title: '' } });
  }

  _onChange = (form, { baseCurrency, vaults, rates }) => {
    const { props, state } = this;
    const from = vaults.find(({ hash }) => hash === props.vault);
    const to = vaults.find(({ hash }) => hash === state.destination);
    let { exchange } = form;

    if (exchange === state.form.exchange) {
      if (from.currency === to.currency) exchange = form.value;
      else if (from.currency === baseCurrency) exchange = form.value * rates[to.currency];
      else if (to.currency === baseCurrency) exchange = form.value / rates[from.currency];
      else exchange = (form.value / rates[from.currency]) * rates[to.currency];
      exchange = parseFloat(exchange, 10).toFixed(2);
    }

    return this.setState({
      form: {
        ...form, from, to, exchange,
      },
    });
  }

  _onValid = valid => this.setState({ valid })

  _onVault = (destination, store) => {
    const { _onChange, state } = this;

    this.setState({ destination }, () => _onChange(state.form, store));
  }

  _onSubmit = async (context) => {
    const { props, state } = this;

    this.setState({ busy: true });
    const { hash } = await onTransfer({ ...context, props, state });
    this.setState({ busy: false });
    if (hash) props.onClose();
  }

  render() {
    const {
      _onChange, _onSubmit, _onVault, _onValid,
      props: {
        onClose, vault, visible, ...inherit
      },
      state: {
        busy, destination, form, valid,
      },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog
            {...inherit}
            onClose={onClose}
            visible={visible}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.NEW} ${l10n.TRANSFER}`}
          >
            <Text lighten level={2}>{l10n.TRANSFER_CAPTION}</Text>
            <View style={styles.form}>
              <Text subtitle level={3}>{l10n.VAULT_DESTINATION}</Text>
              <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} steps={4} style={styles.vaults}>
                { queryAvailableVaults(store, vault).map(({
                  currency, currentBalance, hash, title,
                }) => (
                  <CardOption
                    key={hash}
                    image={FLAGS[currency]}
                    onPress={() => _onVault(hash, store)}
                    selected={hash === destination}
                    style={styles.card}
                    title={title}
                  >
                    <PriceFriendly
                      caption
                      color={hash === destination ? COLOR.WHITE : COLOR.TEXT_LIGHTEN}
                      level={3}
                      value={currentBalance}
                      currency={currency}
                    />
                  </CardOption>
                ))}
              </Slider>
              <Form
                attributes={setCurrency(translate(hydrate(this, store), l10n))}
                color={COLOR.PRIMARY}
                onValid={_onValid}
                onChange={value => _onChange(value, store)}
                value={form}
              />
            </View>
            <Button
              activity={busy}
              color={COLOR.PRIMARY}
              disabled={busy || !valid}
              onPress={() => _onSubmit({ l10n, store })}
              shadow
              style={styles.button}
              title={!busy ? l10n.TRANSFER : undefined}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransfer;

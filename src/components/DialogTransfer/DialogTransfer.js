import { bool, func, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { bannerTransfer } from '../../assets';
import { C, translate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import { hydrateTransfer, onTransfer } from './modules';

import styles from './DialogTransfer.style';

const COLOR_TX = C.COLORS[2];

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
    const to = form.destination
      ? vaults.find(({ title }) => title === form.destination)
      : vaults.find(({ hash }) => hash !== props.vault);
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

  _onSubmit = async (context) => {
    const { props, state } = this;

    this.setState({ busy: true });
    const { hash } = await onTransfer({ ...context, props, state });
    this.setState({ busy: false });
    if (hash) props.onClose();
  }

  render() {
    const {
      _onChange, _onSubmit, _onValid,
      props: {
        onClose, vault, visible,
      },
      state: { busy, form, valid },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog
            visible={visible}
            style={[styles.frame, styles.transfer]}
            styleContainer={styles.dialog}
          >
            <Text color={COLOR_TX} headline level={5} style={styles.text}>
              {`${l10n.NEW} ${l10n.TRANSFER}`}
            </Text>
            <Image source={bannerTransfer} resizeMode="contain" style={styles.banner} />
            <Text lighten level={2} style={styles.text}>
              {l10n.TRANSFER_CAPTION}
            </Text>
            <Form
              attributes={translate(hydrateTransfer({
                form, l10n, store, vault,
              }), l10n)}
              color={COLOR_TX}
              onValid={_onValid}
              onChange={value => _onChange(value, store)}
              style={styles.form}
              value={form}
            />
            <View style={styles.buttons}>
              <Button
                color={COLOR_TX}
                outlined
                onPress={onClose}
                rounded
                style={styles.button}
                title={l10n.CANCEL}
              />
              <Button
                activity={busy}
                color={COLOR_TX}
                disabled={busy || !valid}
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

export default DialogTransfer;

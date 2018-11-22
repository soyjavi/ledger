import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { bannerExpense, bannerIncome, bannerTransfer } from '../../assets';
import { C, translate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import {
  hydrateTransaction, hydrateTransfer, onTransaction, onTransfer,
} from './modules';

import styles from './DialogTransaction.style';

const { COLORS, TX: { TYPE: { TRANSFER } } } = C;
const BANNERS = [bannerExpense, bannerIncome, bannerTransfer];

class DialogTransaction extends PureComponent {
  static propTypes = {
    onClose: func.isRequired,
    type: number.isRequired,
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

    this.setState({
      form: {
        ...form, from, to, exchange,
      },
    });
  }

  _onValid = valid => this.setState({ valid })

  _onSubmit = async (context) => {
    const { props, state } = this;

    this.setState({ busy: true });
    const { hash } = (props.type !== TRANSFER)
      ? await onTransaction({ ...context, props, state })
      : await onTransfer({ ...context, props, state });
    this.setState({ busy: false });
    if (hash) props.onClose();
  }

  render() {
    const {
      _onChange, _onSubmit, _onValid,
      props: {
        onClose, type, vault, visible,
      },
      state: { busy, form, valid },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog visible={visible} style={styles.frame} styleContainer={styles.dialog}>
            <Text color={COLORS[type]} headline level={5} style={styles.text}>
              {`${l10n.NEW} ${l10n.TYPE_TRANSACTION[type]}`}
            </Text>
            <Image source={BANNERS[type]} resizeMode="contain" style={styles.banner} />
            <Text lighten level={2} style={styles.text}>
              {l10n.TRANSACTION_CAPTIONS[type]}
            </Text>
            <Form
              attributes={
                translate((type === TRANSFER
                  ? hydrateTransfer({
                    form, l10n, store, vault,
                  })
                  : hydrateTransaction({ l10n, type })
                ), l10n)
              }
              color={COLORS[type]}
              onValid={_onValid}
              onChange={value => _onChange(value, store)}
              style={styles.form}
              value={form}
            />
            <View style={styles.buttons}>
              <Button title={l10n.CANCEL} color={COLORS[type]} outlined onPress={onClose} style={styles.button} />
              <Button
                title={l10n.SAVE}
                activity={busy}
                color={COLORS[type]}
                disabled={busy || !valid}
                onPress={() => _onSubmit({ l10n, store })}
                style={styles.button}
              />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransaction;

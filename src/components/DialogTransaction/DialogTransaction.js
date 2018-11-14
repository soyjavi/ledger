import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { FORM } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import hydrateForm from './modules/hydrateForm';
import styles from './DialogTransaction.style';

const DEFAULT_FORM = {
  currency: 'USD',
  balance: '0',
};

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
    form: DEFAULT_FORM,
    valid: false,
  };

  _onChange = form => this.setState({ form })

  _onValid = valid => this.setState({ valid })

  _onSubmit = async ({
    l10n,
    store: { latestTransaction: { hash: previousHash }, onTransaction },
  }) => {
    const {
      props: { type, vault, onClose },
      state: { form: { category, value, title } },
    } = this;

    this.setState({ busy: true });
    const response = await onTransaction({
      category: category ? l10n.CATEGORIES[type].indexOf(category) : 0,
      previousHash,
      title: title || '',
      type,
      value: parseFloat(value, 10),
      vault,
    });
    this.setState({ busy: false });
    if (response) onClose();
  }

  render() {
    const {
      _onChange, _onSubmit, _onValid,
      props: { onClose, type, visible },
      state: { busy, form, valid },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog
            title={`${l10n.NEW} ${l10n.TYPE_TRANSACTION[type]}`}
            visible={visible}
            style={styles.frame}
            styleContainer={styles.dialog}
          >
            <Text lighten level={2}>
              $Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <Form
              attributes={hydrateForm(FORM.TRANSACTION, l10n.CATEGORIES[type])}
              onValid={_onValid}
              onChange={_onChange}
              style={styles.form}
              value={form}
            />
            <View style={styles.buttons}>
              <Button title={l10n.CANCEL} outlined onPress={onClose} />
              <Button
                activity={busy}
                disabled={busy || !valid}
                title={l10n.SAVE}
                onPress={() => _onSubmit({ l10n, store })}
              />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogTransaction;

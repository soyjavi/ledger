import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C, FORM } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import styles from './DialogVault.style';

const { CURRENCY } = C;
const DEFAULT_FORM = { currency: CURRENCY, balance: 0 };

class DialogVault extends PureComponent {
  static propTypes = {
    onClose: func.isRequired,
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

  _onSubmit = async ({ onVault }) => {
    const { props: { onClose }, state: { form } } = this;

    this.setState({ busy: true });
    const vault = await onVault(form);
    if (vault) onClose();
    this.setState({ busy: false });
  }

  render() {
    const {
      _onChange, _onSubmit, _onValid,
      props: { onClose, visible },
      state: { busy, form, valid },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store }) => (
          <Dialog
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.NEW} ${l10n.VAULT}`}
            visible={visible}
          >
            <Text lighten level={2}>
              $Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <Form attributes={FORM.VAULT} onValid={_onValid} onChange={_onChange} style={styles.form} value={form} />
            <View style={styles.buttons}>
              <Button title="$cancel" outlined onPress={onClose} />
              <Button activity={busy} disabled={busy || !valid} title="$save" onPress={() => _onSubmit(store)} />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogVault;

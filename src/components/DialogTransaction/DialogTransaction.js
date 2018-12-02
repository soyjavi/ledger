import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { bannerExpense, bannerIncome } from '../../assets';
import { C, translate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import { hydrateTransaction, onTransaction } from './modules';

import styles from './DialogTransaction.style';

const { COLORS, TX: { TYPE: { TRANSFER } } } = C;
const BANNERS = [bannerExpense, bannerIncome];

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

  _onChange = form => this.setState({ form });

  _onValid = valid => this.setState({ valid })

  _onSubmit = async (context) => {
    const { props, state } = this;

    this.setState({ busy: true });
    const { hash } = await onTransaction({ ...context, props, state });
    this.setState({ busy: false });
    if (hash) props.onClose();
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
            visible={visible}
            style={[styles.frame, type === TRANSFER && styles.transfer]}
            styleContainer={styles.dialog}
          >
            <Text color={COLORS[type]} headline level={5} style={styles.text}>
              {`${l10n.NEW} ${l10n.TYPE_TRANSACTION[type]}`}
            </Text>
            <Image source={BANNERS[type]} resizeMode="contain" style={styles.banner} />
            <Text lighten level={2} style={styles.text}>
              {l10n.TRANSACTION_CAPTIONS[type]}
            </Text>
            <Form
              attributes={translate(hydrateTransaction({ l10n, type }), l10n)}
              color={COLORS[type]}
              onValid={_onValid}
              onChange={_onChange}
              style={styles.form}
              value={form}
            />
            <View style={styles.buttons}>
              <Button
                color={COLORS[type]}
                outlined
                onPress={onClose}
                rounded
                style={styles.button}
                title={l10n.CANCEL}
              />
              <Button
                activity={busy}
                color={COLORS[type]}
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

export default DialogTransaction;

import {
  bool, func, number, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { bannerExpense, bannerIncome, bannerTransfer } from '../../assets';
import { C, FORM } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import hydrateForm from './modules/hydrateForm';
import styles from './DialogTransaction.style';

const { COLORS } = C;
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
          <Dialog visible={visible} style={styles.frame} styleContainer={styles.dialog}>
            <Text color={COLORS[type]} headline level={5} style={styles.text}>
              {`${l10n.NEW} ${l10n.TYPE_TRANSACTION[type]}`}
            </Text>
            <Image source={BANNERS[type]} resizeMode="contain" style={styles.banner} />
            <Text lighten level={2} style={styles.text}>
              $Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <Form
              attributes={hydrateForm(FORM.TRANSACTION, l10n.CATEGORIES[type])}
              color={COLORS[type]}
              onValid={_onValid}
              onChange={_onChange}
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

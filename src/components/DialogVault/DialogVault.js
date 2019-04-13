import { bool, func, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../assets';
import { FORM, translate } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Button, Dialog, Form, Slider, Text, Touchable,
} from '../../reactor/components';
import styles from './DialogVault.style';

const { COLOR } = THEME;

class DialogVault extends PureComponent {
  static propTypes = {
    baseCurrency: string,
    onClose: func.isRequired,
    visible: bool,
  };

  static defaultProps = {
    baseCurrency: undefined,
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      currency: props.baseCurrency,
      form: {},
      valid: false,
    };
  }

  componentWillReceiveProps({ visible }) {
    const { props } = this;
    if (visible === true && visible !== props.visible) this.setState({ form: { balance: '0' } });
  }

  _onChange = form => this.setState({ form });

  _onCurrency = currency => this.setState({ currency });

  _onValid = valid => this.setState({ valid })

  _onSubmit = async ({ onVault }) => {
    const { props: { onClose }, state: { currency, form } } = this;

    this.setState({ busy: true });
    const vault = await onVault({ currency, ...form });
    if (vault) onClose();
    this.setState({ busy: false });
  }

  render() {
    const {
      _onChange, _onCurrency, _onSubmit, _onValid,
      props: { baseCurrency, onClose, visible },
      state: {
        busy, currency, form, valid,
      },
    } = this;

    return (
      <Consumer>
        { ({
          l10n,
          store: {
            rates = {}, vaults = [], ...store
          },
        }) => (
          <Dialog
            onClose={vaults.length > 0 ? onClose : undefined}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={`${l10n.NEW} ${l10n.VAULT}`}
            visible={visible}
          >
            <Text lighten level={2}>
              { vaults.length === 0 ? l10n.FIRST_VAULT_CAPTION : l10n.VAULT_CAPTION }
            </Text>
            <View style={styles.form}>
              <Text subtitle level={3}>{l10n.CURRENCIES}</Text>
              <Slider style={styles.currencies}>
                { [baseCurrency, ...Object.keys(rates)].map(item => (
                  <Touchable
                    key={item}
                    onPress={() => _onCurrency(item)}
                    style={[styles.card, currency === item && styles.cardSelected]}
                  >
                    <Image source={FLAGS[item]} style={styles.thumbnail} />
                    <Text caption level={2} color={currency === item ? COLOR.WHITE : undefined} style={currency === item && styles.textHighlight}>{item}</Text>
                  </Touchable>
                ))}
              </Slider>
              <Form attributes={translate(FORM.VAULT, l10n)} onValid={_onValid} onChange={_onChange} value={form} />
            </View>
            <Button
              activity={busy}
              color={COLOR.PRIMARY}
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

export default DialogVault;

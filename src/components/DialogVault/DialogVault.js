import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { bannerVault } from '../../assets';
import { translate } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Button, Dialog, Form, Text,
} from '../../reactor/components';
import hydrate from './modules/hydrate';
import styles from './DialogVault.style';

const { COLOR } = THEME;

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
    form: {},
    valid: false,
  };

  componentWillReceiveProps({ visible }) {
    const { props } = this;
    if (visible === true && visible !== props.visible) this.setState({ form: { balance: '0' } });
  }

  _onChange = form => this.setState({ form });

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
      state: { busy, form: { currency, ...form }, valid },
    } = this;

    return (
      <Consumer>
        { ({
          l10n,
          store: {
            baseCurrency, rates = {}, vaults = [], ...store
          },
        }) => (
          <Dialog style={styles.frame} styleContainer={styles.dialog} visible={visible}>
            <Text color={COLOR.PRIMARY} headline level={5} style={styles.text}>
              {`${l10n.NEW} ${l10n.VAULT}`}
            </Text>
            <Image source={bannerVault} resizeMode="contain" style={styles.banner} />
            <Text lighten level={2} style={styles.text}>
              { vaults.length === 0 ? l10n.FIRST_VAULT_CAPTION : l10n.VAULT_CAPTION }
            </Text>
            <Form
              attributes={translate(hydrate({ baseCurrency, rates, vaults }), l10n)}
              onValid={_onValid}
              onChange={_onChange}
              style={styles.form}
              value={{
                currency: currency || baseCurrency,
                ...form,
              }}
            />
            <View style={styles.buttons}>
              { vaults.length > 0 && (
                <Button
                  title={l10n.CANCEL}
                  color={COLOR.PRIMARY}
                  outlined
                  onPress={onClose}
                  rounded
                  style={styles.button}
                />)}
              <Button
                activity={busy}
                color={COLOR.PRIMARY}
                disabled={busy || !valid}
                onPress={() => _onSubmit(store)}
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

export default DialogVault;

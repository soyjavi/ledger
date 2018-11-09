import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { FORM } from 'common';
import { VaultItem } from 'components';
import { Header } from 'containers';
import { ConsumerNavigation, ConsumerStore } from 'context';
import {
  Button, Dialog, Form, Text, Viewport,
} from 'reactor/components';
import styles from './Profile.style';

const DEFAULT_FORM = {
  currency: 'USD',
  balance: '0',
};

class Profile extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    busy: false,
    dialog: false,
    form: DEFAULT_FORM,
    valid: false,
  };

  _onToggleVault = () => this.setState({ dialog: !this.state.dialog, form: DEFAULT_FORM })

  _onChangeVault = form => this.setState({ form })

  _onValidVault = valid => this.setState({ valid })

  _onSubmitVault = async ({ onVault }) => {
    const { _onToggleVault, state: { form } } = this;

    this.setState({ busy: true });
    const vault = await onVault(form);
    if (vault) _onToggleVault();
    this.setState({ busy: false });
  }

  render() {
    const {
      _onChangeVault, _onSubmitVault, _onToggleVault, _onValidVault,
      props: { visible, ...inherit },
      state: {
        busy, dialog, form, valid,
      },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <ConsumerNavigation>
          { ({ goBack }) => (
            <Header
              busy={busy}
              left={{ title: '$back', onPress: () => goBack() }}
              title="$Profile"
              right={{ title: '$save', onPress: () => console.log('profile:save') }}
              visible
            />
          )}
        </ConsumerNavigation>

        <ConsumerStore>
          { store => (
            <ScrollView style={styles.scroll}>
              { store.vaults.map(vault => <VaultItem key={vault.hash} {...vault} />) }

              <Button title="$New Vault" onPress={_onToggleVault} />

              <Dialog title="$New Vault" visible={dialog} styleContainer={styles.dialog}>
                <Text lighten level={2}>
                  $Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Text>
                <Form
                  attributes={FORM.VAULT}
                  onValid={_onValidVault}
                  onChange={_onChangeVault}
                  style={styles.form}
                  value={form}
                />
                <View style={styles.buttons}>
                  <Button title="$cancel" outlined onPress={_onToggleVault} />
                  <Button disabled={busy || !valid} title="$save" onPress={() => _onSubmitVault(store)} />
                </View>
              </Dialog>
            </ScrollView>
          )}
        </ConsumerStore>

      </Viewport>
    );
  }
}

export default Profile;

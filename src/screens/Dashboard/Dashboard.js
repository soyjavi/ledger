import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import {
  DialogVault, FloatingButton, OverallBalance, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import { Viewport } from '../../reactor/components';
import styles from './Dashboard.style';

class Dashboard extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    dialog: false,
  };

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onVault = ({ navigation, store, vault }) => {
    const today = new Date();
    store.query({ vault: vault.hash, year: today.getFullYear(), month: today.getMonth() });
    navigation.navigate('vault', vault);
  }

  render() {
    const {
      _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, store: { vaults, ...store } }) => (
            <Fragment>
              <OverallBalance />
              <ScrollView style={styles.scroll}>
                { vaults.map(vault => (
                  <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />))}
              </ScrollView>
              <FloatingButton onPress={_onToggleDialog} visible={!dialog && !inherit.backward} />
              { visible && !dialog && vaults.length === 0 && _onToggleDialog() }
              { visible && <DialogVault visible={dialog} onClose={_onToggleDialog} /> }
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Dashboard;

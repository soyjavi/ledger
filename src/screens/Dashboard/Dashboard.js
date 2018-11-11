import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import {
  DialogVault, FloatingButton, OverallBalance, VaultItem,
} from 'components';
import { ConsumerStore } from 'context';
import { Viewport } from 'reactor/components';
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

  _onToggleDialog = () => this.setState({ dialog: !this.state.dialog })

  render() {
    const {
      _onToggleDialog,
      props: { visible, ...inherit },
      state: { dialog },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <ConsumerStore>
          { ({ vaults }) => (
            <Fragment>
              <OverallBalance />
              <ScrollView style={styles.scroll}>
                { vaults.map(vault => <VaultItem key={vault.hash} {...vault} />)}
              </ScrollView>
              <FloatingButton onPress={_onToggleDialog} visible={!dialog && !inherit.backward} />
              { visible && <DialogVault visible={dialog} onClose={_onToggleDialog} /> }
            </Fragment>
          )}
        </ConsumerStore>
      </Viewport>
    );
  }
}

export default Dashboard;

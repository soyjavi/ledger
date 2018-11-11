import { bool, func } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { DialogVault, OverallBalance, VaultItem } from 'components';
import { ConsumerStore } from 'context';
import { Viewport } from 'reactor/components';
import styles from './Dashboard.style';

class Dashboard extends PureComponent {
  static propTypes = {
    dialog: bool,
    onDialog: func,
    visible: bool,
  };

  static defaultProps = {
    dialog: false,
    onDialog() {},
    visible: false,
  };

  render() {
    const {
      props: {
        dialog, onDialog, visible, ...inherit
      },
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
              <DialogVault visible={dialog} onClose={onDialog} />
            </Fragment>
          )}
        </ConsumerStore>
      </Viewport>
    );
  }
}

export default Dashboard;

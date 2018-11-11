import { bool, func } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { Header } from 'containers';
import { DialogVault, OverallBalance, VaultItem } from 'components';
import { Consumer } from 'context';
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

  state = {
    busy: false,
  };

  render() {
    const {
      props: {
        dialog, onDialog, visible, ...inherit
      },
      state: { busy },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ l10n, store: { vaults } }) => (
            <Fragment>
              <Header busy={busy} title={l10n.DASHBOARD} right={{ title: l10n.SEARCH }} visible />
              <ScrollView style={styles.scroll}>
                <OverallBalance />
                { vaults.map(vault => <VaultItem key={vault.hash} {...vault} />)}
              </ScrollView>
              <DialogVault visible={dialog} onClose={onDialog} />
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Dashboard;

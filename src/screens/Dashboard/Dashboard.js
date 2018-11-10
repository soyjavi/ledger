import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { Header } from 'containers';
import { C } from 'common';
import { OverallBalance, VaultItem } from 'components';
import { Consumer } from 'context';
import { Viewport } from 'reactor/components';
import styles from './Dashboard.style';

const { SCREEN } = C;

class Dashboard extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    busy: false,
  };

  render() {
    const {
      props: { visible, ...inherit },
      state: { busy },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation: { navigate }, l10n, store: { vaults } }) => (
            <Fragment>
              <Header
                busy={busy}
                left={{ title: '$profile', onPress: () => navigate(SCREEN.PROFILE) }}
                title={l10n.DASHBOARD}
                right={{ title: l10n.SEARCH }}
                visible
              />
              <ScrollView style={styles.scroll}>
                <OverallBalance />
                { vaults.map(vault => <VaultItem key={vault.hash} {...vault} />)}
              </ScrollView>
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Dashboard;

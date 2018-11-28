import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { iconChart } from '../../assets';
import { C } from '../../common';
import {
  DialogVault, FloatingButton, OverallBalance, VaultItem,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Viewport } from '../../reactor/components';
import styles from './Dashboard.style';

const { SCREEN } = C;
const { COLOR } = THEME;

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
    store.query({ vault: vault.hash, date: new Date().toISOString().substr(0, 7) });
    navigation.navigate('vault', vault);
  }

  _onStats = ({ navigation, store }) => {
    store.query({ method: 'groupByCategory', date: '2018-11' });
    navigation.navigate(SCREEN.STATS);
  }

  render() {
    const {
      _onStats, _onToggleDialog, _onVault,
      props: { visible, ...inherit },
      state: { dialog },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, store: { vaults, ...store } }) => (
            <Fragment>
              <Button
                color={COLOR.TRANSPARENT}
                rippleColor={COLOR.PRIMARY}
                icon={iconChart}
                iconSize={24}
                onPress={() => _onStats({ navigation, store })}
                style={[styles.button, styles.right]}
              />
              <OverallBalance />
              <ScrollView contentContainerStyle={styles.scroll}>
                { vaults.map(vault => (
                  <VaultItem key={vault.hash} {...vault} onPress={() => _onVault({ navigation, store, vault })} />))}
              </ScrollView>
              <FloatingButton onPress={_onToggleDialog} visible={!dialog && !inherit.backward} />
              { visible && vaults.length === 0 && !dialog && this.setState({ dialog: true }) }
              { visible && <DialogVault visible={dialog} onClose={_onToggleDialog} /> }
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Dashboard;

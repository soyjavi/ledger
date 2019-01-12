import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView } from 'react-native';

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
    navigation: shape({}),
    visible: bool,
  };

  static defaultProps = {
    navigation: undefined,
    visible: true,
  };

  state = {
    dialog: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { state: { dialog } } = this;
      if (dialog) this.setState({ dialog: false });
      return true;
    });
  }

  _onToggleDialog = () => {
    const { state: { dialog } } = this;
    this.setState({ dialog: !dialog });
  }

  _onVault = ({ navigation, store, vault }) => {
    const { props } = this;

    store.query({ vault: vault.hash, method: 'groupByDay', date: new Date().toISOString().substr(0, 7) });
    navigation.navigate(SCREEN.VAULT, vault, props.navigation);
  }

  _onStats = ({ navigation, store: { query } }) => {
    const { props } = this;

    query({ method: 'groupByCategory', date: (new Date().toISOString()).substr(0, 7) });
    navigation.navigate(SCREEN.STATS, undefined, props.navigation);
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
              <FloatingButton color={COLOR.PRIMARY} onPress={_onToggleDialog} visible={!dialog && !inherit.backward} />
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

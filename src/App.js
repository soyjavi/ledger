import React, { PureComponent } from 'react';

import { C, L10N } from 'common';
import { DialogVault, FloatingButton, Snackbar } from 'components';
import { Provider, ConsumerNavigation, ConsumerStore } from 'context';
import { LayoutView } from 'reactor/components';
import {
  Profile, Session, Dashboard, Vault, Transaction,
} from 'screens';

const { SCREEN, LANGUAGE } = C;
const {
  PROFILE, SESSION, DASHBOARD, VAULT, TRANSACTION,
} = SCREEN;

class App extends PureComponent {
  state = {
    vault: false,
  };

  _onFloatingButton = ({ current, navigate }) => {
    const { _onToggleVault } = this;

    if (current === DASHBOARD) _onToggleVault();
    else navigate(SCREEN.TRANSACTION);
  }

  _onToggleVault = () => this.setState({ vault: !this.state.vault })


  render() {
    const { _onFloatingButton, _onToggleVault, state: { vault } } = this;

    return (
      <Provider dictionary={L10N} language={LANGUAGE}>
        <ConsumerNavigation>
          { ({
            navigate, current, stack, parameters,
          }) => (
            <LayoutView>
              <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
              <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
              <Profile backward={current !== PROFILE} visible={stack.includes(PROFILE)} />
              <Vault backward={current !== VAULT} visible={stack.includes(VAULT)} dataSource={parameters} />
              <Transaction
                backward={current !== TRANSACTION}
                visible={stack.includes(TRANSACTION)}
                dataSource={parameters}
              />
              <ConsumerStore>
                { ({ error, onError }) => (
                  <Snackbar caption={error} button="close" visible={error} onPress={() => onError(undefined)} />
                )}
              </ConsumerStore>

              <FloatingButton
                onPress={() => _onFloatingButton({ current, navigate })}
                visible={current === DASHBOARD || current === VAULT}
              />

              { current === DASHBOARD && (<DialogVault visible={vault} onClose={_onToggleVault} />) }
            </LayoutView>
          )}
        </ConsumerNavigation>
      </Provider>

    );
  }
}

export default App;

import React, { PureComponent } from 'react';

import { C, L10N } from 'common';
import { FloatingButton, Snackbar } from 'components';
import { Provider, ConsumerNavigation, ConsumerStore } from 'context';
import { LayoutView } from 'reactor/components';
import {
  Session, Dashboard, Vault, Transaction,
} from 'screens';

const { SCREEN, LANGUAGE } = C;
const {
  SESSION, DASHBOARD, VAULT, TRANSACTION,
} = SCREEN;

class App extends PureComponent {
  state = {
    dashboard: false,
    vault: false,
  };

  _onDialog = key => this.setState({ [key]: !this.state[key] })

  render() {
    const { _onDialog, state } = this;

    return (
      <Provider dictionary={L10N} language={LANGUAGE}>
        <ConsumerNavigation>
          { ({
            current, stack, parameters,
          }) => (
            <LayoutView>
              <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
              <Dashboard
                backward={current !== DASHBOARD}
                dialog={state[current]}
                onDialog={() => _onDialog(current)}
                visible={stack.includes(DASHBOARD)}
              />
              <ConsumerStore>
                { ({ txs }) => (
                  <Vault
                    backward={current !== VAULT}
                    dataSource={{ ...parameters, txs }}
                    dialog={state[current]}
                    onDialog={() => _onDialog(current)}
                    visible={stack.includes(VAULT)}
                  />
                )}
              </ConsumerStore>
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
                onPress={() => _onDialog(current)}
                visible={current === DASHBOARD || current === VAULT}
              />
            </LayoutView>
          )}
        </ConsumerNavigation>
      </Provider>
    );
  }
}

export default App;

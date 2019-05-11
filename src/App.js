import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';

import { C } from './common';
import {
  Consumer, ConsumerEvents, ConsumerNavigation, ConsumerStore,
} from './context';
import { THEME } from './reactor/common';
import { LayoutView, Snackbar } from './reactor/components';
import { DialogClone } from './components';
import {
  Session, Settings, Stats, Dashboard, Vault,
} from './screens';
import styles from './App.style';

const { SCREEN, SETTINGS: { NIGHT_MODE } } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT,
} = SCREEN;
const { COLOR } = THEME;

export default () => (
  <ConsumerNavigation>
    { ({
      current, goBack, params, stack,
    }) => (
      <LayoutView style={styles.container}>
        { stack.includes(SESSION) && (
          <ConsumerStore>
            { ({ settings }) => (
              <StatusBar
                backgroundColor={COLOR.BACKGROUND}
                barStyle={settings[NIGHT_MODE] ? 'light-content' : 'dark-content'}
              />
            )}
          </ConsumerStore>
        )}

        { console.log('<App>') }
        <ConsumerEvents>
          { events => <Session {...events} backward={current !== SESSION} visible={stack.includes(SESSION)} /> }
        </ConsumerEvents>
        <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
        <Settings backward={current !== SETTINGS} visible={stack.includes(SETTINGS)} />

        { stack.includes(DASHBOARD) && (
          <ConsumerStore>
            { ({ settings, ...store }) => (
              <Fragment>
                <Vault
                  backward={current !== VAULT}
                  dataSource={stack.includes(VAULT) && params.Vault
                    ? store.vaults.find(({ hash }) => hash === params.Vault.hash)
                    : undefined
                  }
                  goBack={goBack}
                  visible={stack.includes(VAULT)}
                />
                <Stats {...store} backward={current !== STATS} vault={params.Vault} visible={stack.includes(STATS)} />
                <DialogClone
                  dataSource={store.tx}
                  highlight={settings[NIGHT_MODE]}
                  visible={store.tx !== undefined}
                />
              </Fragment>
            )}
          </ConsumerStore>
        )}

        <Consumer>
          { ({ l10n, store: { error, onError } }) => (
            <Snackbar
              caption={error}
              button={l10n.CLOSE}
              visible={error !== undefined}
              onPress={() => onError(undefined)}
            />
          )}
        </Consumer>
      </LayoutView>
    )}
  </ConsumerNavigation>
);

import React, { Fragment } from 'react';

import { C } from './common';
import { Consumer } from './context';
import { THEME } from './reactor/common';
import { LayoutView, Snackbar } from './reactor/components';
import { DialogClone } from './components';
import {
  Session, Settings, Stats, Dashboard, Vault, Vaults,
} from './screens';
import styles from './App.style';

const { SCREEN, SETTINGS: { HIDE_OVERALL_BALANCE } } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT, VAULTS,
} = SCREEN;
const { COLOR } = THEME;

export default () => (
  <Consumer>
    { ({
      events,
      l10n,
      navigation: {
        current, goBack, params, stack,
      },
      store: {
        error, onError, settings: { [HIDE_OVERALL_BALANCE]: mask }, ...store
      },
    }) => (
      <LayoutView style={styles.container}>
        { console.log('<App>') }
        <Session {...events} backward={current !== SESSION} visible />

        { stack.includes(SESSION) && (
          <Fragment>
            <Dashboard backward={current !== DASHBOARD} mask={mask} visible={stack.includes(DASHBOARD)} />
            <Snackbar
              button={l10n.CLOSE.toUpperCase()}
              caption={error}
              color={COLOR.ERROR}
              onPress={() => onError(undefined)}
              visible={!!(error)}
            />
          </Fragment>
        )}

        { stack.includes(DASHBOARD) && (
          <Fragment>
            <Settings visible={stack.includes(SETTINGS)} />
            <Vault
              backward={current !== VAULT}
              dataSource={stack.includes(VAULT) && params.Vault
                ? store.vaults.find(({ hash }) => hash === params.Vault.hash)
                : undefined}
              goBack={goBack}
              visible={stack.includes(VAULT)}
            />
            <Vaults {...store} visible={stack.includes(VAULTS)} />
            <Stats {...store} vault={params.Vault} visible={stack.includes(STATS)} />
            <DialogClone dataSource={store.tx} visible={store.tx !== undefined} />
          </Fragment>
        )}
      </LayoutView>
    )}
  </Consumer>
);

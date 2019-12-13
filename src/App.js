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

const { SCREEN } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT, VAULTS,
} = SCREEN;
const { COLOR } = THEME;

export default () => (
  <Consumer>
    { ({
      l10n,
      navigation: {
        current, goBack, params, stack,
      },
      store: { error, onError, ...store },
    }) => (
      <LayoutView style={styles.container}>
        { console.log('<App>') }
        <Session backward={current !== SESSION} visible />

        { stack.includes(SESSION) && (
          <Fragment>
            <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
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
            <Vaults {...store} visible={stack.includes(VAULTS)} />
            <Vault
              backward={current !== VAULT}
              dataSource={stack.includes(VAULT) && params.Vault
                ? store.vaults.find(({ hash }) => hash === params.Vault.hash)
                : undefined}
              goBack={goBack}
              visible={stack.includes(VAULT)}
            />
            <Stats {...store} vault={params.Vault} visible={stack.includes(STATS)} />
            <DialogClone dataSource={store.tx} visible={store.tx !== undefined} />
          </Fragment>
        )}
      </LayoutView>
    )}
  </Consumer>
);

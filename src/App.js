import React, { Fragment } from 'react';

import { C } from './common';
import { Consumer, ConsumerNavigation } from './context';
import { LayoutView, Snackbar } from './reactor/components';
import { DialogClone } from './components';
import {
  Session, Settings, Stats, Dashboard, Vault,
} from './screens';

const { SCREEN } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT,
} = SCREEN;

export default () => (
  <ConsumerNavigation>
    { ({
      current, goBack, params, stack,
    }) => (
      <LayoutView>
        <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
        <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
        <Settings backward={current !== SETTINGS} visible={stack.includes(SETTINGS)} />

        <Consumer>
          { ({ l10n, store: { error, onError, ...store } }) => (
            <Fragment>
              <Vault
                l10n={l10n}
                backward={current !== VAULT}
                goBack={goBack}
                navigation={{ state: { params: params.Vault } }}
                dataSource={params.Vault ? store.vaults.find(({ hash }) => hash === params.Vault.hash) : undefined}
                visible={stack.includes(VAULT)}
              />
              <Stats {...store} backward={current !== STATS} vault={params.Vault} visible={stack.includes(STATS)} />
              <DialogClone dataSource={store.tx} visible={store.tx !== undefined} />
              <Snackbar
                caption={error}
                button={l10n.CLOSE}
                visible={error !== undefined}
                onPress={() => onError(undefined)}
              />
            </Fragment>
          )}
        </Consumer>
      </LayoutView>
    )}
  </ConsumerNavigation>
);

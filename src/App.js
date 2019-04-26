import React, { Fragment } from 'react';

import { C } from './common';
import { Consumer, ConsumerNavigation, ConsumerStore } from './context';
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
        { console.log('<App>') }
        <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
        <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
        <Settings backward={current !== SETTINGS} visible={stack.includes(SETTINGS)} />

        { stack.includes(DASHBOARD) && (
          <ConsumerStore>
            { store => (
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
                <DialogClone dataSource={store.tx} visible={store.tx !== undefined} />
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

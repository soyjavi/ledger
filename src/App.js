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

export default props => (
  <ConsumerNavigation>
    { ({
      current, goBack, params, stack,
    }) => (
      <LayoutView>
        <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
        <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
        <Settings backward={current !== SETTINGS} visible={stack.includes(SETTINGS)} />
        <Vault
          {...props}
          backward={current !== VAULT}
          goBack={goBack}
          navigation={{ state: { params: params.Vault } }}
          visible={stack.includes(VAULT)}
        />

        <ConsumerStore>
          { store => (
            <Fragment>
              <Stats backward={current !== STATS} {...store} vault={params.Vault} visible={stack.includes(STATS)} />
              <DialogClone
                dataSource={store.tx}
                visible={store.tx !== undefined}
              />
            </Fragment>
          )}
        </ConsumerStore>

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

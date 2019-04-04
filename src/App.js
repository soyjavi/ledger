import React from 'react';

import { C } from './common';
import { Consumer, ConsumerNavigation, ConsumerStore } from './context';
import { LayoutView, Snackbar } from './reactor/components';
import {
  Session, Stats, Dashboard, Vault,
} from './screens';

const { SCREEN } = C;
const {
  SESSION, STATS, DASHBOARD, VAULT,
} = SCREEN;

export default props => (
  <ConsumerNavigation>
    { ({
      current, goBack, params, stack,
    }) => (
      <LayoutView>
        <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />

        <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />

        <ConsumerStore>
          { store => <Stats backward={current !== STATS} {...store} visible={stack.includes(STATS)} /> }
        </ConsumerStore>

        { stack.includes(DASHBOARD) && (
          <Vault
            {...props}
            backward={current !== VAULT}
            goBack={goBack}
            navigation={{ state: { params: params.Vault } }}
            visible={stack.includes(VAULT)}
          />
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

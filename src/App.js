import React from 'react';

import { C, L10N, getLocationAsync } from './common';
import { Provider, Consumer, ConsumerNavigation } from './context';
import { LayoutView, Snackbar } from './reactor/components';
import {
  Session, Dashboard, Stats, Vault,
} from './screens';

const { SCREEN, LANGUAGE } = C;
const {
  SESSION, DASHBOARD, STATS, VAULT,
} = SCREEN;

export default props => (
  <Provider dictionary={L10N} language={LANGUAGE} getLocationAsync={getLocationAsync}>
    <ConsumerNavigation>
      { ({ current, params, stack }) => (
        <LayoutView>
          <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />

          <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
          <Vault
            {...props}
            backward={current !== VAULT}
            navigation={{ state: { params: params.Vault } }}
            visible={stack.includes(VAULT)}
          />
          <Stats backward={current !== STATS} visible={stack.includes(STATS)} />

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
  </Provider>
);

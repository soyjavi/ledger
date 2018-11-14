import React from 'react';

import { C, L10N } from './common';
import { Snackbar } from './components';
import { Provider, ConsumerNavigation, ConsumerStore } from './context';
import { LayoutView } from './reactor/components';
import {
  Session, Dashboard, Vault, Transaction,
} from './screens';

const { SCREEN, LANGUAGE } = C;
const {
  SESSION, DASHBOARD, VAULT, TRANSACTION,
} = SCREEN;

export default () => (
  <Provider dictionary={L10N} language={LANGUAGE}>
    <ConsumerNavigation>
      { ({
        current, stack, parameters,
      }) => (
        <LayoutView>
          <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
          <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
          <Vault backward={current !== VAULT} dataSource={parameters} visible={stack.includes(VAULT)} />
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
        </LayoutView>
      )}
    </ConsumerNavigation>
  </Provider>
);

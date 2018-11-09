import React from 'react';

import { C, L10N } from 'common';
import { Snackbar } from 'components';
import { Provider, ConsumerNavigation, ConsumerStore } from 'context';
import { LayoutView } from 'reactor/components';
import {
  Profile, Session, Summary, Transaction,
} from 'screens';
// import styles from './App.style';

const { SCREEN, LANGUAGE } = C;
const {
  PROFILE, SESSION, SUMMARY, TRANSACTION,
} = SCREEN;

export default () => (
  <Provider dictionary={L10N} language={LANGUAGE}>
    <ConsumerNavigation>
      { ({ current, stack, parameters }) => (
        <LayoutView>
          <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />
          <Summary backward={current !== SUMMARY} visible={stack.includes(SUMMARY)} />
          <Profile backward={current !== PROFILE} visible={stack.includes(PROFILE)} />
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

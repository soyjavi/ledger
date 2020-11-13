import React from 'react';
import { LayoutView } from 'reactor/components';

import { C, L10N } from '@common';
import { L10NProvider, ConnectionProvider, NavigationProvider, StoreProvider, SnackBarProvider } from '@context';

import { Router } from './App.router';
import styles from './App.style';
import { Sync } from './App.sync';

const { LANGUAGE } = C;

const App = () => {
  console.log('<App>');

  return (
    <L10NProvider dictionary={L10N} language={LANGUAGE}>
      <NavigationProvider>
        <ConnectionProvider>
          <StoreProvider>
            <SnackBarProvider>
              <LayoutView style={styles.container}>
                <Router />
                <Sync />
              </LayoutView>
            </SnackBarProvider>
          </StoreProvider>
        </ConnectionProvider>
      </NavigationProvider>
    </L10NProvider>
  );
};

export { App };

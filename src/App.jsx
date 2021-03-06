import React from 'react';
import { LayoutView } from 'reactor/components';

import { C, L10N } from '@common';
import { L10NProvider, ConnectionProvider, NavigationProvider, StoreProvider, SnackBarProvider } from '@context';

import { Router } from './App.router';
import styles from './App.style';

const { LANGUAGE } = C;

const App = () => {
  console.log('<App>');

  return (
    <L10NProvider dictionary={L10N} language={LANGUAGE}>
      <ConnectionProvider>
        <StoreProvider>
          <SnackBarProvider>
            <LayoutView style={styles.container}>
              <NavigationProvider>
                <Router />
              </NavigationProvider>
            </LayoutView>
          </SnackBarProvider>
        </StoreProvider>
      </ConnectionProvider>
    </L10NProvider>
  );
};

export { App };

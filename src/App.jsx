import { useFonts } from 'expo-font';
import React from 'react';
import { LayoutView } from 'reactor/components';
import { Aurora, View } from '@lookiero/aurora';

import { C, L10N } from '@common';
import { L10NProvider, ConnectionProvider, NavigationProvider, StoreProvider, SnackBarProvider } from '@context';
import { ShieldTheme } from '@theming';

import { Router } from './App.router';
import styles from './App.style';

const { LANGUAGE } = C;
const ENV_JEST = process.env.JEST_WORKER_ID !== undefined;

const App = () => {
  const [ready] = !ENV_JEST
    ? useFonts({
        'font-family': require('../assets/fonts/Circular-SP-Book.ttf'),
        'font-family-bold': require('../assets/fonts/Circular-SP-Bold.ttf'),
        'font-family-currency': require('../assets/fonts/IBMPlexSans-Bold.ttf'),

        'font-default': require('../assets/fonts/Circular-SP-Book.ttf'),
        'font-bold': require('../assets/fonts/Circular-SP-Bold.ttf'),
        'font-currency': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
      })
    : [true];

  return (
    <Aurora theme={ShieldTheme}>
      {ready ? (
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
      ) : (
        <></>
      )}
    </Aurora>
  );
};

export { App };

import { Aurora } from '@lookiero/aurora';
import { useFonts } from 'expo-font';
import React from 'react';

import { ConnectionProvider, NavigationProvider, StoreProvider, SnackBarProvider } from '@context';
import { ShieldTheme } from '@theming';

import { Router } from './App.router';

const App = () => {
  const [ready] = useFonts({
    'font-default': require('../assets/fonts/Circular-SP-Book.ttf'),
    'font-bold': require('../assets/fonts/Circular-SP-Bold.ttf'),
    'font-currency': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
    'shield-icons': require('../assets/fonts/Shield-Icons.ttf'),
  });

  return (
    <Aurora theme={ShieldTheme} useProviders={true}>
      {ready ? (
        <ConnectionProvider>
          <StoreProvider>
            <SnackBarProvider>
              <NavigationProvider>
                <Router />
              </NavigationProvider>
            </SnackBarProvider>
          </StoreProvider>
        </ConnectionProvider>
      ) : (
        <></>
      )}
    </Aurora>
  );
};

export { App };

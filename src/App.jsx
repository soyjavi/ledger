import { Aurora } from '@lookiero/aurora';
import { EventProvider } from '@lookiero/event';
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

  return ready ? (
    <Aurora theme={ShieldTheme}>
      <EventProvider>
        <SnackBarProvider>
          <ConnectionProvider>
            <StoreProvider>
              <NavigationProvider>
                <Router />
              </NavigationProvider>
            </StoreProvider>
          </ConnectionProvider>
        </SnackBarProvider>
      </EventProvider>
    </Aurora>
  ) : (
    <></>
  );
};

export { App };

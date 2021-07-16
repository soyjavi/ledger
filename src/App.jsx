import { Aurora } from '@lookiero/aurora';
import { EventProvider } from '@lookiero/event';
import { useFonts } from 'expo-font';
import React from 'react';

import { ConnectionProvider, NavigationProvider, StoreProvider } from '@context';
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
    <EventProvider>
      <ConnectionProvider>
        <StoreProvider>
          <Aurora theme={ShieldTheme}>
            <NavigationProvider>
              <Router />
            </NavigationProvider>
          </Aurora>
        </StoreProvider>
      </ConnectionProvider>
    </EventProvider>
  ) : (
    <></>
  );
};

export { App };

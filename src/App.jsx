import { Aurora } from '@lookiero/aurora';
import { EventProvider } from '@lookiero/event';
import { useFonts } from 'expo-font';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { ConnectionProvider, NavigationProvider, StoreProvider } from '@context';
import { ShieldTheme } from '@theming';

import { Router } from './App.router';
import { style } from './App.style';

const App = () => {
  const [ready] = useFonts({
    'font-default': require('../assets/fonts/Circular-SP-Book.ttf'),
    'font-bold': require('../assets/fonts/Circular-SP-Bold.ttf'),
    'font-currency': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
    'shield-icons': require('../assets/fonts/Shield-Icons.ttf'),
  });
  const { height, width } = useWindowDimensions();

  return ready ? (
    <EventProvider>
      <ConnectionProvider>
        <StoreProvider>
          <Aurora theme={ShieldTheme} style={[style.container, { height, width }]}>
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

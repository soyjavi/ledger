import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { NativeModules, View } from 'react-native';

import { theme } from './src/common';
import { THEME } from './src/reactor/common';

const {
  UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation },
} = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

let Component = React.createElement(View, {
  style: { backgroundColor: theme.COLOR.BACKGROUND, width: '100%', height: '100%' },
});

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadResources() {
      await Font.loadAsync({
        'font-family': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'font-family-bold': require('./assets/fonts/SpaceMono-Bold.ttf'),
        'font-family-currency': require('./assets/fonts/IBMPlexMono-Regular.ttf'),
      });
      THEME.extend(theme);

      const { App } = require('./src/App');
      Component = React.createElement(App);

      setLoaded(true);
    }

    if (!loaded) loadResources();
  }, [loaded]);

  return Component;
};

export default App;

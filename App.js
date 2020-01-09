import React, { useEffect, useState } from 'react';
import { NativeModules, View } from 'react-native';
import * as Font from 'expo-font';

import { C, L10N, theme } from './src/common';
import { THEME } from './src/reactor/common';

const { LANGUAGE } = C;
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
        'font-family': require('./assets/fonts/IBMPlexMono-Regular.ttf'),
        'font-family-bold': require('./assets/fonts/IBMPlexMono-Bold.ttf'),
      });
      THEME.extend(theme);

      const { Provider } = require('./src/context');
      const { App } = require('./src/App');

      // eslint-disable-next-line react/no-children-prop
      Component = React.createElement(Provider, {
        dictionary: L10N,
        language: LANGUAGE,
        children: React.createElement(App),
      });

      setLoaded(true);
    }

    if (!loaded) loadResources();
  }, [loaded]);

  return Component;
};

export default App;

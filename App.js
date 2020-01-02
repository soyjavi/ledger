import React, { useEffect, useState } from 'react';
import { NativeModules, View } from 'react-native';
import * as Font from 'expo-font';

import { C, L10N, theme } from './src/common';
import { Provider } from './src/context';
import { THEME } from './src/reactor/common';

const { LANGUAGE } = C;
const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'font-family': require('./assets/fonts/IBMPlexMono-Regular.ttf'), // eslint-disable-line
        'font-family-bold': require('./assets/fonts/IBMPlexMono-Bold.ttf'), // eslint-disable-line
      });
      THEME.extend(theme);
      setLoaded(true);
    }

    if (!loaded) loadFonts();
  }, [loaded]);

  const App = loaded ? require('./src/App').default : View; // eslint-disable-line

  return loaded
    ? (
      <Provider dictionary={L10N} language={LANGUAGE}>
        <App />
      </Provider>
    )
    : <App />;
};

export default App;

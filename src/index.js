import React from 'react';
import { AppRegistry } from 'react-native';

import {
  C, getFingerprintAsync, getLocationAsync, L10N, theme, themeDark,
} from './common';
import { Provider } from './context';
import { THEME } from './reactor/common';

THEME.extend({
  ...theme,
  COLOR: {
    ...theme.COLOR,
    // ...themeDark.COLOR,
  },
});
const { LANGUAGE } = C;
const App = require('./App').default;

const BrowserApp = () => (
  <Provider
    dictionary={L10N}
    language={LANGUAGE}
    getFingerprintAsync={getFingerprintAsync}
    getLocationAsync={getLocationAsync}
  >
    <App />
  </Provider>
);

AppRegistry.registerComponent('App', () => BrowserApp);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

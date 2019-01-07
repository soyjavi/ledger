import React from 'react';
import { AppRegistry } from 'react-native';

import {
  C, getLocationAsync, L10N, theme,
} from './common';
import { Provider } from './context';
import { THEME } from './reactor/common';

THEME.extend(theme);
const { LANGUAGE } = C;
const App = require('./App').default;

const BrowserApp = () => (
  <Provider dictionary={L10N} language={LANGUAGE} getLocationAsync={getLocationAsync}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('App', () => BrowserApp);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

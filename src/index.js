import React from 'react';
import { AppRegistry } from 'react-native';
// import { createBrowserHistory } from 'history';

import { theme, getLocationAsync } from './common';
import { THEME } from './reactor/common';

THEME.extend(theme);
const App = require('./App').default;

// const history = createBrowserHistory();

const BrowserApp = () => <App getLocationAsync={getLocationAsync} />;

AppRegistry.registerComponent('App', () => BrowserApp);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

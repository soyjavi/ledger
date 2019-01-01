import { AppRegistry } from 'react-native';

import { theme } from './common';
import { THEME } from './reactor/common';

THEME.extend(theme);
const App = require('./App').default;

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

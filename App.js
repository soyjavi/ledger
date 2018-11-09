import { NativeModules } from 'react-native';
import React from 'react';

import { theme } from './src/common';
import { THEME } from './src/reactor/common';

THEME.extend(theme);
const App = require('./src/App').default;

const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

export default () => <App />;

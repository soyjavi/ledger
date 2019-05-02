import React, { PureComponent } from 'react';
import { AppRegistry, View } from 'react-native';

import {
  C, getFingerprintAsync, getLocationAsync, L10N, theme, themeDark,
} from './common';
import { Provider } from './context';
import { Storage } from './context/modules';
import { THEME } from './reactor/common';

const { LANGUAGE, SETTINGS: { NIGHT_MODE } } = C;

class BrowserApp extends PureComponent {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    const { settings = {} } = await Storage.get();
    const nightMode = settings[NIGHT_MODE];

    THEME.extend({
      ...theme,
      COLOR: { ...theme.COLOR, ...(nightMode ? themeDark.COLOR : {}) },
    });

    this.setState({ loaded: true });
  }

  render() {
    const { state: { loaded } } = this;
    const App = loaded ? require('./App').default : View; // eslint-disable-line

    return (
      <Provider
        dictionary={L10N}
        getFingerprintAsync={getFingerprintAsync}
        getLocationAsync={getLocationAsync}
        language={LANGUAGE}
      >
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => BrowserApp);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

import React, { PureComponent } from 'react';
import { NativeModules, View } from 'react-native';
import * as Font from 'expo-font';
import * as LocalAuthentication from 'expo-local-authentication';

import {
  C, getFingerprintAsync, L10N, theme,
} from './src/common';
import { Provider } from './src/context';
import { THEME } from './src/reactor/common';

THEME.extend(theme);

const { IS_DEV, LANGUAGE } = C;
const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { fingerprint: false, loaded: false };
  }

  async componentDidMount() {
    THEME.extend(theme);

    await Font.loadAsync({
      'product-sans': require('./assets/fonts/ProductSans-Regular.ttf'), // eslint-disable-line
      'product-sans-bold': require('./assets/fonts/ProductSans-Bold.ttf'), // eslint-disable-line
    });

    this.setState({
      fingerprint: await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync(),
      loaded: true,
    });
  }

  render() {
    const { fingerprint, loaded } = this.state;
    const App = loaded ? require('./src/App').default : View; // eslint-disable-line
    let callback;

    if (fingerprint) callback = LocalAuthentication.authenticateAsync;
    else if (IS_DEV) callback = getFingerprintAsync;

    return (
      <Provider dictionary={L10N} getFingerprintAsync={callback} language={LANGUAGE}>
        <App />
      </Provider>
    );
  }
}

export default App;

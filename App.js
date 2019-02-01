import React, { PureComponent } from 'react';
import { NativeModules, View } from 'react-native';
import {
  LocalAuthentication,
  Font,
  Location,
  Permissions,
} from 'expo';
import { C, L10N, theme } from './src/common';
import { Provider } from './src/context';
import { THEME } from './src/reactor/common';

THEME.extend(theme);

const { LANGUAGE, LOCATION_PROPS } = C;
const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

class App extends PureComponent {
  state = {
    fingerprint: false,
    loaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'google-sans': require('./assets/fonts/GoogleSans-Regular.ttf'), // eslint-disable-line
      'google-sans-bold': require('./assets/fonts/GoogleSans-Bold.ttf'), // eslint-disable-line
    });

    this.setState({
      fingerprint: await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync(),
      loaded: true,
    });
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') return console.log('ERROR', status, 'Permission to access location was denied');

    const { coords: { latitude, longitude } = {} } = await Location.getCurrentPositionAsync(LOCATION_PROPS);
    return { latitude, longitude };
  };

  render() {
    const { _getLocationAsync, state: { fingerprint, loaded } } = this;
    const App = loaded ? require('./src/App').default : View; // eslint-disable-line
    // const Navigation = require('./App.Navigation').default;

    return (
      <Provider
        dictionary={L10N}
        fingerprint={fingerprint ? LocalAuthentication : undefined}
        getLocationAsync={_getLocationAsync}
        language={LANGUAGE}
      >
        <App />
      </Provider>
    );
  }
}

export default App;

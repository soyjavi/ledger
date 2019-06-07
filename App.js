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
import { Storage } from './src/context/modules';
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
    const { settings = {} } = await Storage.get();

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
        getFingerprintAsync={fingerprint ? LocalAuthentication.authenticateAsync : undefined}
        getLocationAsync={_getLocationAsync}
        language={LANGUAGE}
      >
        <App />
      </Provider>
    );
  }
}

export default App;

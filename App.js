import { Platform, NativeModules, View } from 'react-native';
import React, { PureComponent } from 'react';
import {
  // Constants,
  Fingerprint,
  Font,
  Location,
  Permissions,
} from 'expo';
import { C, theme } from './src/common';
import { THEME } from './src/reactor/common';

const { LOCATION_PROPS } = C;
THEME.extend(theme);

class Container extends PureComponent {
  state = {
    fingerprint: false,
    loaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'google-sans': require('./assets/fonts/GoogleSans-Regular.ttf'),
      'google-sans-bold': require('./assets/fonts/GoogleSans-Bold.ttf'),
    });

    this.setState({
      fingerprint: await Fingerprint.hasHardwareAsync() && await Fingerprint.isEnrolledAsync(),
      loaded: true,
    });
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') return console.log('ERROR', status, 'Permission to access location was denied');

    const { coords: { latitude, longitude } = {} } = await Location.getCurrentPositionAsync(LOCATION_PROPS);
    return { latitude, longitude };
  };

  _getFingerprintAsync = async () => {
    const { success } = await Fingerprint.authenticateAsync();
    if (success) {
      if (Platform.OS === 'android') Fingerprint.cancelAuthenticate();
      return true;
    }
    return false;
  }

  render() {
    const { _getFingerprintAsync, _getLocationAsync, state: { fingerprint, loaded } } = this;
    const Component = loaded ? require('./src/App').default : View;

    return (
      <Component
        getFingerprintAsync={fingerprint ? _getFingerprintAsync : undefined}
        getLocationAsync={_getLocationAsync}
      />);
  }
}

const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

export default () => <Container />;

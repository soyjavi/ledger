import { NativeModules, View } from 'react-native';
import React, { PureComponent } from 'react';
import {
  // Constants,
  Font,
  Location,
  Permissions,
} from 'expo';
import { theme } from './src/common';
import { THEME } from './src/reactor/common';

THEME.extend(theme);

class Container extends PureComponent {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'google-sans': require('./assets/fonts/GoogleSans-Regular.ttf'),
      'google-sans-bold': require('./assets/fonts/GoogleSans-Bold.ttf'),
    });

    this.setState({ loaded: true });
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') return console.log('ERROR', status, 'Permission to access location was denied');

    const { coords: { latitude, longitude } = {} } = await Location.getCurrentPositionAsync({});
    return { latitude, longitude };
  };


  render() {
    const { _getLocationAsync, state: { loaded } } = this;
    const Component = loaded ? require('./src/App').default : View;

    return <Component getLocationAsync={_getLocationAsync} />;
  }
}


const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

export default () => <Container />;

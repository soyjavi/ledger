import { NativeModules, View } from 'react-native';
import React, { PureComponent } from 'react';
import { Font } from 'expo';

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

  render() {
    const { state: { loaded } } = this;
    const Component = loaded ? require('./src/App').default : View;

    return <Component />;
  }
}


const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

export default () => <Container />;

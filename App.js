import React, { PureComponent } from 'react';
import { NativeModules, View } from 'react-native';
import * as Font from 'expo-font';

import { C, L10N, theme } from './src/common';
import { Provider } from './src/context';
import { THEME } from './src/reactor/common';

THEME.extend(theme);

const { LANGUAGE } = C;
const { UIManager: { setLayoutAnimationEnabledExperimental: setLayoutAnimation } } = NativeModules;
if (setLayoutAnimation) setLayoutAnimation(true);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  async componentDidMount() {
    THEME.extend(theme);

    await Font.loadAsync({
      'product-sans': require('./assets/fonts/ProductSans-Regular.ttf'), // eslint-disable-line
      'product-sans-bold': require('./assets/fonts/ProductSans-Bold.ttf'), // eslint-disable-line
    });

    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const App = loaded ? require('./src/App').default : View; // eslint-disable-line

    return (
      <Provider dictionary={L10N} language={LANGUAGE}>
        <App />
      </Provider>
    );
  }
}

export default App;

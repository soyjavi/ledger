import { func, node } from 'prop-types';
import React, { PureComponent, createContext } from 'react';
import { NetInfo } from 'react-native';

import { C } from '../common';

const KEY = `${C.NAME}:context:events`;
const { Provider, Consumer: ConsumerEvents } = createContext(KEY);

class ProviderEvents extends PureComponent {
  static propTypes = {
    children: node,
    getFingerprintAsync: func,
    getLocationAsync: func,
  };

  static defaultProps = {
    children: undefined,
    getFingerprintAsync: undefined,
    getLocationAsync: undefined,
  };

  state = {
    isConnected: false,
  };

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => this.setState({ isConnected }));
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', isConnected => this.setState({ isConnected }));
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange');
  }

  render() {
    const { props: { children, getFingerprintAsync, getLocationAsync }, state } = this;

    return (
      <Provider value={{ ...state, getFingerprintAsync, getLocationAsync }}>
        { children }
      </Provider>
    );
  }
}

export { ConsumerEvents, ProviderEvents };

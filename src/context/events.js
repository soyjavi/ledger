import { func, node } from 'prop-types';
import React, { PureComponent, createContext } from 'react';

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

  render() {
    const { props: { children, getFingerprintAsync, getLocationAsync } } = this;

    return (
      <Provider value={{ getFingerprintAsync, getLocationAsync }}>
        { children }
      </Provider>
    );
  }
}

export { ConsumerEvents, ProviderEvents };

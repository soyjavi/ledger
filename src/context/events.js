import { node } from 'prop-types';
import React, { useEffect, useState, createContext } from 'react';
import { NetInfo } from 'react-native';

import { C } from '../common';

const { Provider, Consumer: ConsumerEvents } = createContext(`${C.NAME}:context:events`);

const ProviderEvents = ({ children, ...props }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    NetInfo.isConnected.fetch().then(setConnected);
    NetInfo.isConnected.addEventListener('connectionChange', setConnected);
    // return () => NetInfo.isConnected.removeEventListener('connectionChange');
  }, []);

  return (
    <Provider value={{ connected, ...props }}>
      { children }
    </Provider>
  );
};

ProviderEvents.propTypes = {
  children: node.isRequired,
};

export { ConsumerEvents, ProviderEvents };

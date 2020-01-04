import { node } from 'prop-types';
import React, { useContext, useEffect, useState, createContext } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { C } from '../common';

const ConnectionContext = createContext(`${C.NAME}:context:connection`);

const ConnectionProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    NetInfo.isConnected.fetch().then(setConnected);
    NetInfo.isConnected.addEventListener('connectionChange', setConnected);

    return () => {
      NetInfo.isConnected.removeEventListener('connectionChange');
    };
  }, []);

  return <ConnectionContext.Provider value={{ connected }}>{children}</ConnectionContext.Provider>;
};

ConnectionProvider.propTypes = {
  children: node.isRequired,
};

export { ConnectionProvider };

export const useConnection = () => useContext(ConnectionContext);

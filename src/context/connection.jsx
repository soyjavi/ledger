import { node } from 'prop-types';
import React, { useContext, useEffect, useState, createContext } from 'react';
import { useEnvironment } from 'reactor/hooks';
import NetInfo from '@react-native-community/netinfo';

import { C } from '@common';

const ConnectionContext = createContext(`${C.NAME}:context:connection`);

const ConnectionProvider = ({ children }) => {
  const { IS_NATIVE } = useEnvironment();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (IS_NATIVE) {
      NetInfo.fetch().then((state) => setConnected(state.isConnected));
      NetInfo.addEventListener((state) => setConnected(state.isConnected));
    } else {
      NetInfo.isConnected.fetch().then(setConnected);
      NetInfo.isConnected.addEventListener('connectionChange', setConnected);
    }

    return () => {
      if (IS_NATIVE) NetInfo.addEventListener();
      else NetInfo.isConnected.removeEventListener('connectionChange');
    };
  }, []);

  return <ConnectionContext.Provider value={{ connected }}>{children}</ConnectionContext.Provider>;
};

ConnectionProvider.propTypes = {
  children: node.isRequired,
};

export { ConnectionProvider };

export const useConnection = () => useContext(ConnectionContext);

import { node } from 'prop-types';

import React, { useCallback, useContext, useEffect, useLayoutEffect, useState, createContext } from 'react';
import { useEnvironment } from 'reactor/hooks';

import { C } from '@common';
import NetInfo from '@react-native-community/netinfo';
import { status } from '@services';

const { TIMEOUT } = C;

const ConnectionContext = createContext(`${C.NAME}:context:connection`);

const ConnectionProvider = ({ children }) => {
  const { IS_NATIVE } = useEnvironment();

  const [online, setOnline] = useState(false);
  const [connected, setConnected] = useState(false);

  useLayoutEffect(() => {
    if (IS_NATIVE) {
      NetInfo.fetch().then((state) => setOnline(state.isConnected));
      NetInfo.addEventListener((state) => setOnline(state.isConnected));
    } else {
      NetInfo.isConnected.fetch().then(setOnline);
      NetInfo.isConnected.addEventListener('connectionChange', setOnline);
    }

    return () => {
      if (IS_NATIVE) NetInfo.addEventListener();
      else NetInfo.isConnected.removeEventListener('connectionChange');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(handleConnected, connected ? TIMEOUT.CONNECTION_STABLE : TIMEOUT.CONNECTION);

    return () => clearInterval(interval);
  }, [connected, handleConnected, online]);

  useEffect(() => {
    handleConnected();
  }, [handleConnected, online]);

  const handleConnected = useCallback(async () => {
    if (!online) setConnected(false);
    else setConnected((await status().catch(() => {})) ? true : false);
  }, [online]);

  return <ConnectionContext.Provider value={{ connected, online }}>{children}</ConnectionContext.Provider>;
};

ConnectionProvider.propTypes = {
  children: node.isRequired,
};

export { ConnectionProvider };

export const useConnection = () => useContext(ConnectionContext);

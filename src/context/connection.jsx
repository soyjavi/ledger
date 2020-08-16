import { node } from 'prop-types';

import React, { useContext, useEffect, useState, createContext } from 'react';
import { useEnvironment } from 'reactor/hooks';

import { C } from '@common';
import NetInfo from '@react-native-community/netinfo';
import { status } from '@services';

const INTERVAL_CHECK_CONNECTED = 10000;

const ConnectionContext = createContext(`${C.NAME}:context:connection`);

const ConnectionProvider = ({ children }) => {
  const { IS_NATIVE } = useEnvironment();

  const [online, setOnline] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('>>>> test <<<<', { online, connected });
      if (!online) clearInterval(interval);
    }, INTERVAL_CHECK_CONNECTED);

    const checkConnected = async () => setConnected(online ? (await status().catch(() => {})) !== undefined : false);
    checkConnected();

    return () => clearInterval(interval);
  }, [online]);

  return <ConnectionContext.Provider value={{ connected, online }}>{children}</ConnectionContext.Provider>;
};

ConnectionProvider.propTypes = {
  children: node.isRequired,
};

export { ConnectionProvider };

export const useConnection = () => useContext(ConnectionContext);

import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState, createContext } from 'react';

import { C } from '@common';
import { ServiceNode } from '@services';

const { TIMEOUT } = C;

const ConnectionContext = createContext(`${C.NAME}:context:connection`);

const ConnectionProvider = ({ children }) => {
  const [online, setOnline] = useState(false);
  const [connected, setConnected] = useState(false);

  useLayoutEffect(() => {
    NetInfo.fetch().then((state) => setOnline(state.isConnected));
    NetInfo.addEventListener((state) => setOnline(state.isConnected));

    return () => {
      NetInfo.addEventListener();
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
    else setConnected((await ServiceNode.ready().catch(() => {})) ? true : false);
  }, [online]);

  return <ConnectionContext.Provider value={{ connected, online }}>{children}</ConnectionContext.Provider>;
};

ConnectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useConnection = () => useContext(ConnectionContext);

export { ConnectionProvider, useConnection };

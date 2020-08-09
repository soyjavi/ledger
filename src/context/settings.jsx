import { node } from 'prop-types';
import { AsyncStorage } from 'vanilla-storage';

import React, { useContext, useLayoutEffect, useState, createContext } from 'react';

import { C } from '@common';

import { AsyncStorageAdapter } from './adapters';

const KEY = `${C.NAME}:context:settings`;
const SettingsContext = createContext(KEY);
const STORE_KEY = 'settings';

const SettingsProvider = ({ children }) => {
  const [state, setState] = useState(undefined);
  const [store, setStore] = useState(undefined);

  useLayoutEffect(() => {
    async function fetchStorage() {
      const store = await new AsyncStorage({
        adapter: AsyncStorageAdapter,
        defaults: { settings: { maskAmount: false, visibleVaults: {} } },
        filename: `${C.NAME}:settings`,
      });

      setState(await store.get(STORE_KEY).value);
      setStore(store);
    }

    if (!store) fetchStorage();
  }, []);

  const updateState = async (key, value) => {
    await store.get(STORE_KEY).save({ [key]: value });
    setState({ ...state, [key]: value });
  };

  return (
    <SettingsContext.Provider
      value={{
        state,
        setMaskAmount: (value) => updateState('maskAmount', value),
        setVisibleVaults: (vault, value) => updateState('visibleVaults', { ...state.visibleVaults, [vault]: value }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: node.isRequired,
};

export { SettingsProvider };

export const useSettings = () => useContext(SettingsContext);

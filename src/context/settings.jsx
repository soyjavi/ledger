import { node } from 'prop-types';

import React, { useContext, useEffect, useReducer, useState, createContext } from 'react';
import { Storage } from 'reactor/bridges';

import { C } from '@common';

const KEY = `${C.NAME}:context:settings`;
const SettingsContext = createContext(KEY);

const reducer = (state, action) => {
  switch (action.type) {
    case 'MASK_AMOUNT':
      return { ...state, maskAmount: action.value };

    case 'VAULT_VISIBLE':
      return { ...state, [action.vault]: action.value };

    case 'STORE':
      return { ...action.value };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const SettingsProvider = ({ children }) => {
  const [loaded, setLoad] = useState(false);
  const [state, dispatch] = useReducer(reducer, { maskAmount: false });

  useEffect(() => {
    async function fetchStorage() {
      setLoad(true);
      const value = await Storage.get(KEY);
      if (value) dispatch({ type: 'STORE', value });
    }

    if (!loaded) fetchStorage();
    else Storage.set(KEY, state);
  }, [loaded, state]);

  return <SettingsContext.Provider value={{ state, dispatch }}>{children}</SettingsContext.Provider>;
};

SettingsProvider.propTypes = {
  children: node.isRequired,
};

export { SettingsProvider };

export const useSettings = () => useContext(SettingsContext);

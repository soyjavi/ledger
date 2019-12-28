import { node } from 'prop-types';
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

import { C } from '../common';
import { consolidate, Storage } from './modules';

const { CURRENCY, NAME } = C;
const StoreContext = createContext(`${NAME}:context:store`);

const INITIAL_STATE = {
  overall: {},
  // -- STORAGE --------------------------------------------------------------
  authorization: undefined,
  baseCurrency: CURRENCY,
  fingerprint: undefined,
  pin: undefined,
  rates: {},
  secret: undefined,
  txs: [],
  vaults: [],
  version: undefined,
};

const StoreProvider = ({ children }) => {
  const [state, setState] = useState(undefined);
  const [sync, setSync] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const load = async () => {
      setState({ ...INITIAL_STATE, ...consolidate(await Storage.get()) });
    };
    if (!state) load();
  }, [state]);

  const save = async (nextState = {}) => {
    const next = consolidate({ ...INITIAL_STATE, ...state, ...nextState });

    await Storage.set(next);
    setState(next);
  };

  const onError = (error) => setError(error ? error.message : undefined);

  return (
    <StoreContext.Provider
      value={{
        error, onError, sync, setSync, ...state, save,
      }}
    >
      { children }
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: node.isRequired,
};

export { StoreProvider };

export const useStore = () => useContext(StoreContext);

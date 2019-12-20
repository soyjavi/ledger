import { node } from 'prop-types';
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

import { C } from '../common';
import { consolidate, Storage } from './modules';
import {
  createTx, createVault, fork, getAuthorization, syncProfile,
} from './services';

const { CURRENCY, NAME } = C;
const StoreContext = createContext(`${NAME}:context:store`);

const INITIAL_STATE = {
  error: undefined,
  overall: {},
  tx: undefined,
  sync: false,
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
  useEffect(() => {
    const load = async () => {
      setState({ ...INITIAL_STATE, ...consolidate(await Storage.get()) });
    };
    if (!state) load();
  }, [state]);

  const store = (nextState) => Storage.set({ ...state, ...nextState });

  const onError = (error) => setState({ ...state, error: error ? error.message : undefined });

  const onSync = async () => {
    setState({ ...state, sync: false });
    let nextState = await syncProfile({ onError, state });
    if (nextState) {
      nextState = consolidate(nextState);
      await store(nextState);
    }

    setState({ ...state, ...nextState, sync: true });
    return nextState;
  };

  const signup = async (pin) => {
    const authorization = await getAuthorization({ onError, state });

    if (authorization) {
      await store({ authorization, pin });
      setState({
        ...state, authorization, pin, sync: false,
      });
    }
  };

  const onFork = async (query) => {
    const response = await fork({ onError, state }, query);

    if (response) await onSync();
    return response;
  };

  const onSelectTx = (tx) => {
    let next;
    if (tx) {
      const { state: { vaults } } = { onError, state };
      const { currency } = tx ? vaults.find(({ hash }) => hash === tx.vault) : {};
      next = { ...tx, currency };
    }
    setState({ ...state, tx: next });
  };

  const onTx = async (props) => {
    const tx = await createTx({ onError, state }, props);

    if (tx) {
      const nextState = consolidate({ ...state, tx: undefined, txs: [...state.txs, tx] });
      await store(nextState);
      setState(nextState);
    }
    return tx;
  };

  const onVault = async (props) => {
    const vault = await createVault({ onError, state }, props);

    if (vault) {
      const vaults = [...state.vaults, vault];
      let nextState = { ...state, rates: state.rates, vaults };

      if (vaults.length === 1) {
        nextState.baseCurrency = vault.currency;
        delete state.rates[vault.currency];
      }
      nextState = consolidate({ ...state, ...nextState });

      await store(nextState);
      setState({ ...state, ...nextState });
    }

    return vault;
  };

  return (
    <StoreContext.Provider
      value={{
        onError, onSync, onFork, onTx, onSelectTx, onVault, signup, ...state,
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

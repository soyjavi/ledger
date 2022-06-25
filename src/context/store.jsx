import PropTypes from 'prop-types';
import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { AsyncStorage } from 'vanilla-storage';

import { C } from '@common';
import { ServiceNode } from '@services';

import { AsyncStorageAdapter } from './adapters';
import { useConnection } from './connection';
import { calcHash, consolidate, getFingerprint, parseTx, parseVault } from './modules';

const { CURRENCY, NAME } = C;
const FILENAME = `${C.NAME}:store`;
const StoreContext = createContext(`${NAME}:context:store`);

const StoreProvider = ({ children }) => {
  const { connected } = useConnection();

  const [state, setState] = useState({
    blockchain: undefined,
    settings: {
      baseCurrency: CURRENCY,
    },
    store: undefined,
    rates: {},
    vaults: [],
    txs: [],
  });

  useLayoutEffect(() => {
    (async () => {
      const store = await new AsyncStorage({
        adapter: AsyncStorageAdapter,
        defaults: {
          settings: {
            ...getFingerprint(),
            authorization: undefined,
            baseCurrency: CURRENCY,
            maskAmount: false,
            onboarded: false,
            pin: undefined,
          },
          rates: {},
          txs: [],
          vaults: [],
        },
        filename: FILENAME,
      });

      setState({
        store,
        settings: await store.get('settings').value,
        rates: await store.get('rates').value,
        vaults: await store.get('vaults').value,
        txs: await store.get('txs').value,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTx = async (data = {}) => {
    const { store } = state;

    store.get('txs');
    const tx = await store.push(parseTx({ ...data, timestamp: new Date().getTime(), hash: calcHash(data) }));
    if (tx) setState({ ...state, txs: await store.get('txs').value });

    return tx;
  };

  const addVault = async (data = {}) => {
    const { store } = state;

    store.get('vaults');
    const vault = await store.push(parseVault({ ...data, timestamp: new Date().getTime(), hash: calcHash(data) }));
    if (vault) setState({ ...state, vaults: await store.get('vaults').value });

    return vault;
  };

  const updateRates = async (rates, baseCurrency = state.settings.baseCurrency) => {
    const nextRates = { ...state.rates, ...rates };
    const nextSettings = { ...state.settings, baseCurrency, lastRatesUpdate: new Date() };
    await state.store.get('rates').save(nextRates);
    await state.store.get('settings').save(nextSettings);

    setState({ ...state, rates: nextRates, settings: nextSettings });
  };

  const updateSettings = async (value) => {
    const nextSettings = { ...state.settings, ...value };
    await state.store.get('settings').save(nextSettings);

    setState({ ...state, settings: nextSettings });
  };

  const updateTx = async ({ hash, ...data } = {}) => {
    const { store } = state;

    store.get('txs');
    const tx = await store.findOne({ hash });
    if (!tx) return undefined;

    await store.update({ hash }, parseVault({ ...tx, ...data }));
    // ! @TODO: Sync properly
    // if (connected) ServiceNode.sync({ key, block, settings });

    setState({ ...state, txs: await store.value });

    return await store.findOne({ hash });
  };

  const updateVault = async ({ hash, ...data } = {}) => {
    const { store } = state;

    store.get('vaults');
    const vault = await store.findOne({ hash });
    if (!vault) return undefined;

    await store.update({ hash }, parseVault({ ...vault, ...data }));
    // ! @TODO: Sync properly
    // if (connected) ServiceNode.sync({ key, block, settings });

    setState({ ...state, vaults: await store.value });

    return await store.findOne({ hash });
  };

  const fork = async ({ txs = [], vaults = [] } = {}) => {
    const { settings, store } = state;

    await store.wipe('vaults');
    await store.wipe('txs');

    await store.get('vaults');
    await store.save(vaults);

    await store.get('txs');
    await store.save(
      txs.map(
        ({
          balance,
          // eslint-disable-next-line no-unused-vars
          location,
          value,
          ...others
        }) => ({ ...others, value: balance || value }),
      ),
    );

    if (connected) await ServiceNode.sync({ settings, blockchain: { vaults: [], txs: [] } });

    setState({
      ...state,
      vaults: await store.get('vaults').value,
      txs: await store.get('txs').value,
    });

    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        ...consolidate(state),
        addTx,
        addVault,
        fork,
        updateRates,
        updateSettings,
        updateTx,
        updateVault,
      }}
    >
      {state.store ? children : undefined}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };

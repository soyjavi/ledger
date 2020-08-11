import { node } from 'prop-types';
import { AsyncBlockchain } from 'vanilla-blockchain';
import { AsyncStorage } from 'vanilla-storage';

import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useFingerprint } from 'reactor/hooks';

import { C } from '@common';

import { AsyncStorageAdapter } from './adapters';
import { consolidate } from './modules';

const { CURRENCY, NAME } = C;
const StoreContext = createContext(`${NAME}:context:store`);
const STORE_KEY = 'store';

const StoreProvider = ({ children }) => {
  const [state, setState] = useState();
  const [store, setStore] = useState();
  const [blockchain, setBlockchain] = useState(undefined);

  useLayoutEffect(() => {
    const fetchStorage = async () => {
      const { uuid: secret, device_id: fingerprint } = await useFingerprint();

      const store = await new AsyncStorage({
        adapter: AsyncStorageAdapter,
        defaults: {
          settings: {
            authorization: undefined,
            baseCurrency: CURRENCY,
            fingerprint,
            maskAmount: false,
            onboarded: false,
            pin: undefined,
            secret,
            visibleVaults: {},
          },
          rates: {},
        },
        filename: `${C.NAME}:${STORE_KEY}`,
      });

      const blockchain = await new AsyncBlockchain({
        adapter: AsyncStorageAdapter,
        defaults: { vaults: [], txs: [] },
        filename: `${C.NAME}:${STORE_KEY}:blockchain`,
        key: 'vaults',
      });

      setStore(store);
      setBlockchain(blockchain);
      setState({
        settings: await store.get('settings').value,
        rates: await store.get('rates').value,
        vaults: await blockchain.get('vaults').blocks,
        txs: await blockchain.get('txs').blocks,
      });
    };

    if (!store) fetchStorage();
  }, []);

  const updateStore = async (key, value) => {
    await store.get(key).save(value);
    setState({
      ...state,
      settings: await store.get('settings').value,
      rates: await store.get('rates').value,
    });
  };

  const addBlock = async (chain, data = {}) => {
    blockchain.get(chain);
    const { hash: previousHash } = blockchain.latestBlock;

    const block = await blockchain.addBlock(data, previousHash);
    console.log(':: addBlock ::', block);

    setState({
      ...state,
      vaults: await blockchain.get('vaults').blocks,
      txs: await blockchain.get('txs').blocks,
    });

    return block;
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        ...consolidate(state),
        addVault: (data = {}) => addBlock('vaults', { ...data, balance: parseFloat(data.balance, 10) }),
        addTx: (data = {}) => addBlock('txs', { ...data, value: parseFloat(data.value, 10) }),
        updateSettings: (key, value) => updateStore('settings', { ...state.settings, [key]: value }),
        updateRates: (value) => updateStore('rates', value),
        // overall: {},
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: node.isRequired,
};

export { StoreProvider };

export const useStore = () => useContext(StoreContext);

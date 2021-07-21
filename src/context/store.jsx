import PropTypes from 'prop-types';
import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { AsyncBlockchain } from 'vanilla-blockchain';
import { AsyncStorage } from 'vanilla-storage';

import { C } from '@common';
import { ServiceNode } from '@services';

import { AsyncStorageAdapter } from './adapters';
import { useConnection } from './connection';
import { consolidate, getFingerprint } from './modules';

const { CURRENCY, NAME } = C;
const FILENAME = `${C.NAME}:store`;
const FILENAME_BLOCKCHAIN = `${C.NAME}:store:blockchain`;
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
        },
        filename: FILENAME,
      });

      const blockchain = await new AsyncBlockchain({
        adapter: AsyncStorageAdapter,
        defaults: { vaults: [], txs: [] },
        filename: FILENAME_BLOCKCHAIN,
        key: 'vaults',
      });

      setState({
        store,
        blockchain,
        settings: await store.get('settings').value,
        rates: await store.get('rates').value,
        vaults: await blockchain.get('vaults').blocks,
        txs: await blockchain.get('txs').blocks,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStore = async (key, value) => {
    await state.store.get(key).save(value);
    setState({
      ...state,
      settings: await state.store.get('settings').value,
      rates: await state.store.get('rates').value,
    });
  };

  const addBlock = async (key, data = {}) => {
    const { settings } = state;
    const { hash: previousHash } = state.blockchain.get(key).latestBlock;

    const block = await state.blockchain.addBlock(data, previousHash);
    if (connected) ServiceNode.sync({ key, block, settings });

    setState({
      ...state,
      vaults: await state.blockchain.get('vaults').blocks,
      txs: await state.blockchain.get('txs').blocks,
    });

    return block;
  };

  const fork = async (blockchain) => {
    const { settings } = state;

    const storage = await new AsyncStorageAdapter({ filename: FILENAME_BLOCKCHAIN });
    await storage.wipe();

    const fork = await new AsyncBlockchain({
      adapter: AsyncStorageAdapter,
      defaults: blockchain,
      filename: FILENAME_BLOCKCHAIN,
      key: 'vaults',
    });

    if (connected) await ServiceNode.sync({ settings, blockchain: { vaults: [], txs: [] } });

    setState({
      ...state,
      blockchain: fork,
      vaults: await fork.get('vaults').blocks,
      txs: await fork.get('txs').blocks,
    });

    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        ...consolidate(state),
        addVault: ({ balance = 0, currency, title } = {}) =>
          addBlock('vaults', { balance: parseFloat(balance, 10), currency, title }),
        addTx: (data = {}) => addBlock('txs', { ...data, value: parseFloat(data.value, 10) }),
        fork,
        updateSettings: (value) => updateStore('settings', { ...state.settings, ...value }),
        updateRates: (value) => updateStore('rates', { ...state.rates, ...value }),
      }}
    >
      {state.blockchain && state.store && children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };

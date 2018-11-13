import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from 'common';
import { Fingerprint } from 'reactor/context/Amplitude/modules';
import { AsyncStore, calcVault, groupByDay } from './modules';

const { NAME } = C;
const KEY = `${NAME}:context:store`;
const { Provider, Consumer: ConsumerStore } = createContext(KEY);

class ProviderStore extends Component {
  static propTypes = {
    children: node,
  };

  static defaultProps = {
    children: undefined,
  };

  state = {
    error: undefined,
    fingerprint: undefined,
    hash: undefined,
    latestTransaction: undefined,
    queryProps: {},
    queryTxs: [],
    // -- STORAGE --------------------------------------------------------------
    pin: undefined,
    txs: [],
    vaults: [],
    // -------------------------------------------------------------------------
  }

  async componentWillMount() {
    let store = (await AsyncStore.getItem(KEY)) || {};

    store = {
      ...store,
      fingerprint: store.fingerprint || (await Fingerprint()).uuid,
    };
    this.setState(store);
  }

  getHash = async (pin) => {
    const { onError, _store, state: { fingerprint, pin: storedPin } } = this;

    const { hash } = await fetch({
      method: 'POST',
      service: storedPin ? 'signin' : 'signup',
      fingerprint,
      pin,
    }).catch(onError);

    await _store({ pin });
    this.setState({ pin, hash });

    return hash;
  }

  getProfile = async () => {
    const { onError, _store, state: { hash: authorization, txs } } = this;

    const response = await fetch({ service: 'profile', headers: { authorization } }).catch(onError);
    if (response) {
      const { latestTransaction } = response;
      const vaults = response.vaults.map((vault, index) => calcVault(vault, txs, index));

      await _store({ vaults });
      this.setState({ latestTransaction, vaults });
    }

    return response;
  }

  getTransactions = async () => {
    const { onError, _store, state: { hash: authorization } } = this;

    const { txs } = await fetch({ service: 'transactions', headers: { authorization } }).catch(onError);
    if (txs) {
      await _store({ txs });
      this.setState({ txs });
    }
  }

  onError = error => this.setState({ error: error ? error.message : undefined });

  onTransaction = async (props) => {
    const { onError, _store, state: { hash: authorization, queryProps, ...state } } = this;

    const latestTransaction = await fetch({
      method: 'POST', service: 'transaction', headers: { authorization }, ...props,
    }).catch(onError);

    if (latestTransaction) {
      const txs = [...state.txs, latestTransaction];
      const vaults = state.vaults.map((vault, index) => (
        vault.hash !== props.vault ? vault : calcVault(vault, txs, index)
      ));

      console.log('updatedVault:cashflow', vaults[0].cashflow);

      await _store({ txs, vaults });
      // this.forceUpdate();
      this.setState({
        latestTransaction,
        txs,
        vaults,
        queryTxs: groupByDay(txs, queryProps),
      });
    }

    return latestTransaction;
  }

  onVault = async (props) => {
    const { onError, _store, state: { hash: authorization, ...state } } = this;

    const vault = await fetch({
      method: 'POST', service: 'vault', headers: { authorization }, ...props,
    }).catch(onError);

    if (vault) {
      const vaults = [...state.vaults, calcVault(vault, state.txs, state.vaults.length)];
      await _store({ vaults });
      this.setState({ vaults });
    }

    return vault;
  }

  query = (queryProps) => {
    const { state: { txs } } = this;
    this.setState({ queryProps, queryTxs: groupByDay(txs, queryProps) });
  }

  _store = async (value) => {
    const { state: { pin, txs = [], vaults = [] } } = this;
    await AsyncStore.setItem(KEY, {
      pin, txs, vaults, ...value,
    });
  }

  render() {
    const {
      getHash, getProfile, getTransactions, onError, onTransaction, onVault, query,
      props: { children },
      state,
    } = this;

    return (
      <Provider
        value={{
          getHash, getProfile, getTransactions, onError, onTransaction, onVault, query, ...state,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

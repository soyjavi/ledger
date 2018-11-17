import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from '../common';
import { Fingerprint } from '../reactor/context/Amplitude/modules';
import {
  AsyncStore, calcOverall, calcVault, groupByDay,
} from './modules';

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
    baseCurrency: undefined,
    pin: undefined,
    rates: {},
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

    if (hash) {
      await _store({ pin });
      this.setState({ pin, hash });
    }

    return hash;
  }

  getProfile = async () => {
    const { onError, _store, state: { hash: authorization, txs } } = this;

    const response = await fetch({ service: 'profile', headers: { authorization } }).catch(onError);
    if (response) {
      const { baseCurrency, latestTransaction, rates } = response;
      const vaults = response.vaults.map((vault, index) => calcVault(vault, txs, index));

      await _store({ baseCurrency, rates, vaults });
      this.setState({
        baseCurrency, latestTransaction, rates, vaults,
      });
    }

    return response;
  }

  getTransactions = async () => {
    const { onError, _store, state: { hash: authorization, ...state } } = this;

    const { txs } = await fetch({ service: 'transactions', headers: { authorization } }).catch(onError);

    if (txs) {
      const overall = calcOverall({ ...state, txs });

      await _store({ overall, txs });
      this.setState({ overall, txs });
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
      const overall = calcOverall({ ...state, vaults, txs });

      await _store({ overall, txs, vaults });
      this.setState({
        latestTransaction,
        overall,
        queryTxs: groupByDay(txs, queryProps),
        txs,
        vaults,
      });
    }

    return latestTransaction;
  }

  onVault = async (props) => {
    const { onError, _store, state: { hash: authorization, ...state } } = this;
    let { state: { baseCurrency } } = this;

    const vault = await fetch({
      method: 'POST', service: 'vault', headers: { authorization }, ...props,
    }).catch(onError);

    if (vault) {
      const vaults = [...state.vaults, calcVault(vault, state.txs, state.vaults.length)];
      if (vaults.length === 1) {
        baseCurrency = vault.currency;
        delete state.rates[vault.currency];
      }

      const nextState = {
        baseCurrency,
        overall: calcOverall({ ...state, baseCurrency, vaults }),
        rates: state.rates,
        vaults,
      };

      await _store(nextState);
      this.setState(nextState);
    }

    return vault;
  }

  query = (queryProps) => {
    const { state: { txs } } = this;
    this.setState({ queryProps, queryTxs: groupByDay(txs, queryProps) });
  }

  _store = async (value) => {
    const {
      baseCurrency, pin, rates = {}, txs = [], vaults = [],
    } = this.state;

    await AsyncStore.setItem(KEY, {
      baseCurrency, pin, rates, txs, vaults, ...value,
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

import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from '../common';
import { Fingerprint } from '../reactor/context/Amplitude/modules';
import {
  AsyncStore, calcOverall, calcVault, groupByCategory, groupByDay, sortByTransactions,
} from './modules';

const { COLORS, NAME } = C;
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
    chartMaxBalance: undefined,
    error: undefined,
    fingerprint: undefined,
    hash: undefined,
    overall: {},
    queryProps: {},
    queryTxs: [],
    // -- STORAGE --------------------------------------------------------------
    baseCurrency: undefined,
    latestTransaction: undefined,
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

  handshake = async () => {
    const { onError, _store, state: { hash: authorization, latestTransaction, ...state } } = this;
    const headers = { authorization };
    let { state: { txs } } = this;

    const response = await fetch({ service: 'profile', headers }).catch(onError);
    if (response) {
      const { latestTransaction: { hash } } = response;

      if (hash !== latestTransaction.hash) {
        const service = `transactions?latestTransaction=${latestTransaction.hash ? latestTransaction.hash : ''}`;
        const { txs: newTxs } = await fetch({ service, headers }).catch(onError);
        txs = [...txs, ...newTxs];
      }

      const vaults = sortByTransactions(response.vaults.map((vault, index) => calcVault(vault, txs, index)));
      await _store({ ...response, txs, vaults });
      this.setState({
        ...response, overall: calcOverall({ ...state, vaults }), txs, vaults,
      });
    }
  }

  onError = error => this.setState({ error: error ? error.message : undefined });

  onTransaction = async (props) => {
    const {
      _store, onError,
      state: { hash: authorization, queryProps, ...state },
    } = this;

    const latestTransaction = await fetch({
      method: 'POST', service: 'transaction', headers: { authorization }, ...props,
    }).catch(onError);

    if (latestTransaction) {
      const txs = [...state.txs, latestTransaction];
      const vaults = sortByTransactions(state.vaults.map((vault, index) => (
        vault.hash !== props.vault ? { ...vault, color: COLORS[index] } : calcVault(vault, txs, index)
      )));
      const overall = calcOverall({ ...state, vaults });

      await _store({ overall, txs, vaults });
      this.setState({
        latestTransaction,
        overall,
        queryTxs: groupByDay({ ...state, txs }, queryProps),
        txs,
        vaults,
      });
    }

    return latestTransaction || {};
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

  query = (queryProps = {}) => {
    const { state } = this;
    const { method } = queryProps;
    let queryTxs = [];

    if (method === 'groupByDay') queryTxs = groupByDay(state, queryProps);
    else if (method === 'groupByCategory') queryTxs = groupByCategory(state, queryProps);

    this.setState({ queryProps, queryTxs });
  }

  _store = async (value) => {
    const {
      baseCurrency, latestTransaction, pin, rates = {}, txs = [], vaults = [],
    } = this.state;

    await AsyncStore.setItem(KEY, {
      baseCurrency, latestTransaction, pin, rates, txs, vaults, ...value,
    });
  }

  render() {
    const {
      getHash, handshake, onError, onTransaction, onVault, query,
      props: { children },
      state,
    } = this;

    return (
      <Provider
        value={{
          getHash, handshake, onError, onTransaction, onVault, query, ...state,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

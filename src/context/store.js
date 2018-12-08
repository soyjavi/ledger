import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from '../common';
import { Fingerprint } from '../reactor/context/Amplitude/modules';
import {
  AsyncStore, calcOverall, calcVault, groupByCategory, groupByDay, sortByTransactions,
} from './modules';

const { COLORS, NAME, VERSION } = C;
const KEY = `${NAME}:context:store`;
const { Provider, Consumer: ConsumerStore } = createContext(KEY);

class ProviderStore extends Component {
  static propTypes = {
    children: node.isRequired,
  };

  state = {
    error: undefined,
    fingerprint: undefined,
    hash: undefined,
    overall: {},
    queryProps: {},
    queryTxs: [],
    // -- STORAGE --------------------------------------------------------------
    baseCurrency: undefined,
    pin: undefined,
    rates: {},
    txs: [],
    vaults: [],
    version: undefined,
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

  onError = error => this.setState({ error: error ? error.message : undefined });

  onHandshake = async () => {
    const { onError, _store, state: { hash: authorization, version } } = this;
    const headers = { authorization };
    let { state: { txs = [] } } = this;

    const profile = await fetch({ service: 'profile', headers }).catch(onError);
    if (profile) {
      const { baseCurrency, latestTransaction: { hash } = {}, rates } = profile;
      const { hash: latestHash } = txs[txs.length - 1] || {};

      if (hash !== latestHash || version !== VERSION) {
        // const service = `transactions?latestTransaction=${latestTransaction.hash ? latestTransaction.hash : ''}`;
        const service = 'transactions';
        const { txs: newTxs } = await fetch({ service, headers }).catch(onError);
        // txs = [...txs, ...newTxs];
        txs = newTxs;
      }

      const nextState = {
        baseCurrency,
        rates,
        txs,
        vaults: sortByTransactions(profile.vaults.map((vault, index) => calcVault(vault, txs, index))),
        version: VERSION,
      };
      await _store(nextState);
      this.setState({ ...nextState, overall: calcOverall(nextState) });
    }
  }

  onTransaction = async (props) => {
    const {
      _store, onError,
      state: { hash: authorization, queryProps, ...state },
    } = this;
    let { state: { txs = [] } } = this;
    const { hash: previousHash } = txs[txs.length - 1] || {};

    const newTransaction = await fetch({
      method: 'POST', service: 'transaction', headers: { authorization }, previousHash, ...props,
    }).catch(onError);

    if (newTransaction) {
      txs = [...txs, newTransaction];
      const vaults = sortByTransactions(state.vaults.map((vault, index) => (
        vault.hash !== props.vault ? { ...vault, color: COLORS[index] } : calcVault(vault, txs, index)
      )));
      const nextState = { txs, vaults };

      await _store(nextState);
      this.setState({
        ...nextState,
        overall: calcOverall({ ...state, vaults }),
        queryTxs: groupByDay({ ...state, txs }, queryProps),
      });
    }

    return newTransaction;
  }

  onVault = async (props) => {
    const { onError, _store, state: { hash: authorization, rates, ...state } } = this;
    let { state: { baseCurrency } } = this;

    const vault = await fetch({
      method: 'POST', service: 'vault', headers: { authorization }, ...props,
    }).catch(onError);

    if (vault) {
      const vaults = [...state.vaults, calcVault(vault, state.txs, state.vaults.length)];
      if (vaults.length === 1) {
        baseCurrency = vault.currency;
        delete rates[vault.currency];
      }

      const nextState = {
        baseCurrency,
        overall: calcOverall({ baseCurrency, rates, vaults }),
        rates,
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
      baseCurrency, pin, rates = {}, txs = [], vaults = [], version,
    } = this.state;

    await AsyncStore.setItem(KEY, {
      baseCurrency, pin, rates, txs, vaults, version, ...value,
    });
  }

  render() {
    const {
      getHash, onHandshake, onError, onTransaction, onVault, query,
      props: { children },
      state,
    } = this;

    return (
      <Provider
        value={{
          getHash, onHandshake, onError, onTransaction, onVault, query, ...state,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

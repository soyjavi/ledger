import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from '../common';
import { consolidate, Storage } from './modules';

const { CURRENCY, NAME, VERSION } = C;
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
    tx: undefined,
    sync: false,
    // -- STORAGE --------------------------------------------------------------
    baseCurrency: CURRENCY,
    pin: undefined,
    rates: {},
    settings: {},
    txs: [],
    vaults: [],
    version: undefined,
  }

  async componentWillMount() {
    this.setState({ ...consolidate(await Storage.get()), sync: false });
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
      this.setState({ pin, hash, sync: false });
    }

    return hash;
  }

  onError = error => this.setState({ error: error ? error.message : undefined });

  onSync = async () => {
    const { onError, _store, state: { hash: authorization, version } } = this;
    const headers = { authorization };
    let { state: { txs = [] } } = this;
    let nextState = {};

    const profile = await fetch({ service: 'profile', headers }).catch(onError);
    if (profile) {
      const {
        baseCurrency, latestTransaction: { hash } = {}, rates, vaults = [],
      } = profile;
      const { hash: localHash } = txs[txs.length - 1] || {};

      if (hash !== localHash || version !== VERSION) {
        let service = 'transactions';
        // if (hash && localHash) service += `?latestTransaction=${localHash}`;
        const { txs: newTxs } = await fetch({ service, headers }).catch(onError);
        // txs = [...txs, ...newTxs];
        txs = [...newTxs];
      }
      nextState = consolidate({
        baseCurrency, rates, sync: true, txs, vaults, version: VERSION,
      });

      await _store(nextState);
      this.setState(nextState);
    }

    return nextState;
  }

  onSettings = (value) => {
    const { _store } = this;
    let { state: { settings = {} } } = this;

    settings = { ...settings, ...value };
    this.setState({ settings });
    _store({ settings });
  }

  onTransaction = async (props) => {
    const {
      _store, onError,
      state: { hash: authorization, txs = [], ...state },
    } = this;
    const { hash: previousHash } = txs[txs.length - 1] || {};

    const newTransaction = await fetch({
      method: 'POST', service: 'transaction', headers: { authorization }, previousHash, ...props,
    }).catch(onError);

    if (newTransaction) {
      const nextState = consolidate({ ...state, txs: [...txs, newTransaction] });
      await _store(nextState);
      this.setState(nextState);
    }

    return newTransaction;
  }

  onTx = (tx) => {
    const { state: { vaults } } = this;
    const { currency } = tx ? vaults.find(({ hash }) => hash === tx.vault) : {};

    this.setState({ tx: tx ? { ...tx, currency } : undefined });
  }

  onVault = async (props) => {
    const { onError, _store, state: { hash: authorization, rates, ...state } } = this;
    let { state: { baseCurrency } } = this;

    const vault = await fetch({
      method: 'POST', service: 'vault', headers: { authorization }, ...props,
    }).catch(onError);

    if (vault) {
      const vaults = [...state.vaults, vault];

      if (vaults.length === 1) {
        baseCurrency = vault.currency;
        delete rates[vault.currency];
      }

      const nextState = consolidate({
        ...state, baseCurrency, rates, vaults,
      });

      await _store(nextState);
      this.setState(nextState);
    }

    return vault;
  }

  _store = nextState => Storage.set({ ...this.state, ...nextState });

  render() {
    const { props: { children }, state, ...events } = this;

    return (
      <Provider value={{ ...events, ...state }}>
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

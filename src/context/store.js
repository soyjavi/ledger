import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C } from '../common';
import { consolidate, Storage } from './modules';
import {
  createTx, createVault, getHash, syncProfile,
} from './services';

const { CURRENCY, NAME } = C;
const { Provider, Consumer: ConsumerStore } = createContext(`${NAME}:context:store`);

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
    const hash = await getHash(this, pin);

    if (hash) {
      const { _store } = this;

      await _store({ pin });
      this.setState({ pin, hash, sync: false });
    }
  }

  onError = error => this.setState({ error: error ? error.message : undefined });

  onSettings = (value) => {
    const { _store, state: { settings = {} } } = this;
    const nextState = { ...settings, ...value };

    this.setState(nextState);
    _store(nextState);
  }

  onSelectTx = (tx) => {
    const { state: { vaults } } = this;
    const { currency } = tx ? vaults.find(({ hash }) => hash === tx.vault) : {};

    this.setState({ tx: tx ? { ...tx, currency } : undefined });
  }

  onSync = async () => {
    const { _store } = this;
    const nextState = consolidate(await syncProfile(this));

    await _store(nextState);
    this.setState({ ...nextState, sync: true });
  }

  onTx = async (props) => {
    const { _store, state: { txs = [], ...state } } = this;
    const tx = await createTx(this, props);

    if (tx) {
      const nextState = consolidate({ ...state, txs: [...txs, tx] });

      await _store(nextState);
      this.setState(nextState);
    }

    return tx;
  }

  onVault = async (props) => {
    const { _store, state: { rates, ...state } } = this;

    const vault = await createVault(this, props);

    if (vault) {
      const vaults = [...state.vaults, vault];
      let nextState = { ...state, rates, vaults };

      if (vaults.length === 1) {
        nextState.baseCurrency = vault.currency;
        delete rates[vault.currency];
      }
      nextState = consolidate({ ...this.state, ...nextState });

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

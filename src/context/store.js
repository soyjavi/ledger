import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C } from '../common';
import { consolidate, Storage } from './modules';
import {
  createTx, createVault, getAuthorization, getLocations, syncProfile,
} from './services';

const { CURRENCY, NAME, SETTINGS } = C;
const { Provider, Consumer: ConsumerStore } = createContext(`${NAME}:context:store`);

class ProviderStore extends Component {
  static propTypes = {
    children: node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      fingerprint: undefined,
      overall: {},
      tx: undefined,
      sync: false,
      // -- STORAGE --------------------------------------------------------------
      authorization: undefined,
      baseCurrency: CURRENCY,
      pin: undefined,
      rates: {},
      settings: {
        [SETTINGS.HIDE_OVERALL_BALANCE]: false,
        [SETTINGS.SHOW_VAULT_CURRENCY]: true,
      },
      txs: [],
      vaults: [],
      version: undefined,
    };
  }

  async componentWillMount() {
    this.setState({ ...consolidate(await Storage.get()), sync: false });
  }

  signup = async (pin) => {
    const authorization = await getAuthorization(this);

    if (authorization) {
      const { _store } = this;

      await _store({ authorization, pin });
      this.setState({ authorization, pin, sync: false });
    }
  }

  getLocations = (query) => getLocations(this, query);

  onError = (error) => this.setState({ error: error ? error.message : undefined });

  onSettings = async (value) => {
    const { _store, state: { settings = {} } } = this;
    const nextState = { settings: { ...settings, ...value } };

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

    this.setState({ sync: false });
    let nextState = await syncProfile(this);
    if (nextState) {
      nextState = consolidate(nextState);
      await _store(nextState);
    }

    this.setState({ ...nextState, sync: true });
    return nextState;
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

  _store = (nextState) => Storage.set({ ...this.state, ...nextState });

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

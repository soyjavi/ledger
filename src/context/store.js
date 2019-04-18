import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from '../common';
import { Fingerprint } from '../reactor/context/Tracking/modules';
import {
  AsyncStore, calcOverall, calcVault, sortByProgression, sortByTimestamp,
} from './modules';

const { NAME, VERSION } = C;
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
    const { onError, _store, state: { hash: authorization, version, vaults } } = this;
    const headers = { authorization };
    let { state: { txs = [] } } = this;
    let nextState = {};

    const profile = await fetch({ service: 'profile', headers }).catch(onError);
    if (profile) {
      const { baseCurrency, latestTransaction: { hash } = {}, rates } = profile;
      const { hash: localHash } = txs[txs.length - 1] || {};

      if (hash !== localHash || version !== VERSION) {
        const service = 'transactions';
        // if (hash && localHash) service += `?latestTransaction=${hash}`;
        const { txs: newTxs } = await fetch({ service, headers }).catch(onError);
        // txs = [...txs, ...newTxs];
        txs = [...newTxs];
      }

      nextState = {
        baseCurrency,
        rates,
        txs: sortByTimestamp(txs),
        vaults: sortByProgression(profile.vaults.map(vault => calcVault({
          txs, baseCurrency, rates, vault: { ...(vaults.find(item => item.hash === vault.hash) || {}), ...vault },
        }))),
        version: VERSION,
      };

      await _store(nextState);
      this.setState({ ...nextState, overall: calcOverall(nextState) });
    }

    return nextState;
  }

  onTransaction = async (props) => {
    const {
      _store, onError,
      state: { hash: authorization, ...state },
    } = this;
    let { state: { txs = [] } } = this;
    const { hash: previousHash } = txs[txs.length - 1] || {};

    const newTransaction = await fetch({
      method: 'POST', service: 'transaction', headers: { authorization }, previousHash, ...props,
    }).catch(onError);

    if (newTransaction) {
      txs = [...txs, newTransaction];
      const vaults = sortByProgression(state.vaults.map(vault => (
        vault.hash !== props.vault ? vault : calcVault({ ...state, vault, txs })
      )));
      const nextState = { txs: sortByTimestamp(txs), vaults };

      await _store(nextState);
      this.setState({
        ...nextState,
        overall: calcOverall({ ...state, vaults }),
      });
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

  onVaultUpdate = async (updatedVault) => {
    const { _store, state: { vaults } } = this;

    const nextState = {
      vaults: vaults.map(vault => (
        vault.hash !== updatedVault.hash ? vault : updatedVault
      )),
    };

    await _store(nextState);
    this.setState(nextState);
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
    const { props: { children }, state, ...events } = this;

    return (
      <Provider value={{ ...events, ...state }}>
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

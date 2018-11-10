import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, fetch } from 'common';
import { Fingerprint } from 'reactor/context/Amplitude/modules';
import AsyncStore from './modules/AsyncStore';

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
    error: undefined,
    hash: undefined,
    latestTransaction: undefined,
    // -- STORAGE --------------------------------------------------------------
    fingerprint: undefined,
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

    await AsyncStore.setItem(KEY, store);
    this.setState(store);
  }

  getHash = async (pin) => {
    const { onError, state: { fingerprint, pin: storedPin } } = this;

    const { hash } = await fetch({
      method: 'POST',
      service: storedPin ? 'signin' : 'signup',
      fingerprint,
      pin,
    }).catch(onError);

    await AsyncStore.setItem(KEY, { fingerprint, pin });
    this.setState({ fingerprint, pin, hash });

    return hash;
  }

  getProfile = async () => {
    const { onError, state: { hash: authorization } } = this;

    const response = await fetch({ service: 'profile', headers: { authorization } }).catch(onError);
    if (response) {
      const { vaults, latestTransaction } = response;
      this.setState({
        vaults: vaults.map((vault, index) => ({ ...vault, color: COLORS[index] })),
        latestTransaction,
      });
      console.log('@TODO: We should compare latestTransaction', latestTransaction);
    }

    return response;
  }

  getTransactions = async () => {
    const { onError, state: { hash: authorization } } = this;

    const response = await fetch({ service: 'transactions', headers: { authorization } }).catch(onError);
    if (response) this.setState({ txs: response.txs });
  }

  onTransaction = async (props) => {
    const { onError, state: { hash: authorization, txs } } = this;

    const tx = await fetch({
      method: 'POST',
      service: 'transaction',
      headers: { authorization },
      ...props,
    }).catch(onError);

    if (tx) {
      this.setState({
        txs: [...txs, tx],
        latestTransaction: tx,
      });
    }

    return tx;
  }

  onVault = async (props) => {
    const { onError, state: { hash: authorization, vaults } } = this;

    const vault = await fetch({
      method: 'POST',
      service: 'vault',
      headers: { authorization },
      ...props,
    }).catch(onError);

    if (vault) this.setState({ vaults: [...vaults, vault] });

    return vault;
  }

  onError = (error) => {
    console.log('!', error);
    this.setState({ error: error ? error.message : undefined });
  }

  wipe = () => this.setState({});

  render() {
    const {
      getHash, getProfile, getTransactions, onError, onTransaction, onVault, wipe,
      props: { children },
      state,
    } = this;

    return (
      <Provider
        value={{
          getHash, getProfile, getTransactions, onError, onTransaction, onVault, wipe, ...state,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

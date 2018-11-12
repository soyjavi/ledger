import { node } from 'prop-types';
import React, { Component, createContext } from 'react';

import { C, cashflow, fetch } from 'common';
import { Fingerprint } from 'reactor/context/Amplitude/modules';
import { AsyncStore, groupByDay } from './modules';

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
    queryProps: {},
    queryTxs: [],
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

  query = (queryProps) => {
    const { state: { txs } } = this;
    let queryTxs = [];

    if (queryProps.vault) queryTxs = groupByDay(txs, queryProps);

    this.setState({ queryProps, queryTxs });
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
    const { onError, state: { hash: authorization, txs } } = this;

    const response = await fetch({ service: 'profile', headers: { authorization } }).catch(onError);
    if (response) {
      const { vaults, latestTransaction } = response;

      console.log('@TODO: We should compare latestTransaction', latestTransaction);

      this.setState({
        vaults: vaults.map((vault, index) => ({
          ...vault,
          cashflow: cashflow(txs.filter(tx => tx.vault === vault.hash)),
          chart: [10, 40, 50, 30, 80, 90, 50, 20, 20, 40, 50, 80],
          color: COLORS[index],
        })),
        latestTransaction,
      });
    }

    return response;
  }

  getTransactions = async () => {
    const { onError, state: { fingerprint, pin, hash: authorization } } = this;

    const { txs } = await fetch({ service: 'transactions', headers: { authorization } }).catch(onError);
    if (txs) {
      await AsyncStore.setItem(KEY, { fingerprint, pin, txs });
      this.setState({ txs });
    }
  }

  onTransaction = async (props) => {
    const { onError, state: { hash: authorization, queryProps, txs } } = this;

    const tx = await fetch({
      method: 'POST', service: 'transaction', headers: { authorization }, ...props,
    }).catch(onError);

    if (tx) {
      this.setState({
        txs: [...txs, tx],
        latestTransaction: tx,
      });
      this.query(queryProps);
    }

    return tx;
  }

  onVault = async (props) => {
    const { onError, state: { hash: authorization, vaults } } = this;

    const vault = await fetch({
      method: 'POST', service: 'vault', headers: { authorization }, ...props,
    }).catch(onError);

    if (vault) this.setState({ vaults: [...vaults, vault] });

    return vault;
  }

  onError = error => this.setState({ error: error ? error.message : undefined });

  wipe = () => this.setState({});

  render() {
    const {
      getHash, getProfile, getTransactions, onError, onTransaction, onVault, query, wipe,
      props: { children },
      state,
    } = this;

    return (
      <Provider
        value={{
          getHash, getProfile, getTransactions, onError, onTransaction, onVault, query, wipe, ...state,
        }}
      >
        { children }
      </Provider>
    );
  }
}

export { ConsumerStore, ProviderStore };

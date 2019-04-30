import { C, fetch } from '../../common';

const { VERSION } = C;

export default async (component) => {
  const { onError, state: { hash, txs = [], version } } = component;
  const headers = { authorization: hash };
  let nextState = {};

  const profile = await fetch({ service: 'profile', headers }).catch(onError);

  if (profile) {
    const {
      baseCurrency, latestTransaction: { hash: remoteHash } = {}, rates, vaults = [],
    } = profile;
    const { hash: localHash } = txs[txs.length - 1] || {};
    nextState = {
      baseCurrency, rates, txs, vaults, version: VERSION,
    };

    if (remoteHash !== localHash || version !== VERSION) {
      let service = 'transactions';
      // if (remoteHash && localHash) service += `?latestTransaction=${localHash}`;

      const { txs: newTxs = [] } = await fetch({ service, headers }).catch(onError);
      // nextState.txs = (remoteHash && localHash) ? [...txs, ...newTxs] : newTxs;
      nextState.txs = newTxs;
    }
  }

  return nextState;
};

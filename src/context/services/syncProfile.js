import { C, fetch } from '../../common';

const { VERSION } = C;

export default async ({
    onError,
    state: {
      authorization, secret, txs = [], version,
    },
  }) => {
  const headers = { authorization, secret };
  let nextState;

  const profile = await fetch({
    service: 'profile',
    headers,
  }).catch(onError);

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
      if (localHash !== undefined && remoteHash !== localHash && version === VERSION) {
        service += `?latestTransaction=${localHash}`;
      }

      const { txs: newTxs = [] } = await fetch({ service, headers }).catch(onError) || {};

      nextState.txs = (remoteHash !== localHash) ? [...txs, ...newTxs] : newTxs;
      nextState.txs = newTxs;
    }
  }

  return nextState;
};

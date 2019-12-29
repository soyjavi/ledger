import { C } from '../common';
import { apiCall, composeHeaders } from './modules';

const { VERSION } = C;

const getProfile = async (store, signup = {}) => {
  const { onError, authorization = signup.authorization, secret } = store;
  const headers = { authorization, secret };

  const profile = await apiCall({ service: 'profile', headers }).catch(onError);
  if (!profile) return undefined;

  const { version } = store;
  let { txs = [] } = store;
  const { latestTransaction: { hash: remoteHash } = {}, ...inherit } = profile;
  const { hash: localHash } = txs[txs.length - 1] || {};

  if (remoteHash !== localHash || version !== VERSION) {
    const { txs: nextTxs = [] } = await apiCall({ service: 'transactions', headers }).catch(onError) || {};
    if (nextTxs.length > 0) txs = nextTxs;
  }

  await store.save({
    ...inherit, ...signup, txs, version: VERSION,
  });

  store.setSync(true);
};

const fork = async (store, query = '') => {
  const { onError } = store;
  const [secure, file] = query.split('|');

  const response = await apiCall({
    method: 'POST',
    service: 'fork',
    headers: composeHeaders(store),
    secure,
    file,
  }).catch(onError);

  return response;
};

export { getProfile, fork };

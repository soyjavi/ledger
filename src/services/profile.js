import { C } from '@common';

import { apiCall, composeHeaders } from './modules';

const { VERSION } = C;

export const getProfile = async (store, snackbar, signup = {}) => {
  const { authorization = signup.authorization, secret } = store;
  const headers = { authorization, secret };

  const profile = await apiCall({ service: 'profile', headers }).catch((error) => snackbar.error(error.message));
  if (!profile) return undefined;

  const { version } = store;
  let { txs = [] } = store;
  const { latestTransaction: { hash: remoteHash } = {}, ...inherit } = profile;
  const { hash: localHash } = txs[txs.length - 1] || {};

  if (remoteHash !== localHash || version !== VERSION) {
    const { txs: nextTxs = [] } =
      (await apiCall({ service: 'transactions', headers }).catch((error) => snackbar.error(error.message))) || {};
    if (nextTxs.length > 0) txs = nextTxs;
  }

  await store.save({
    ...inherit,
    ...signup,
    txs,
    version: VERSION,
  });

  store.setSync(true);
};

export const fork = async (store, snackbar, query = '') => {
  const [secure, file] = query.split('|');

  const response = await apiCall({
    method: 'POST',
    service: 'fork',
    headers: composeHeaders(store),
    secure,
    file,
  }).catch((error) => snackbar.error(error.message));

  return response;
};

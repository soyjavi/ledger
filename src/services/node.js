import { apiCall } from './modules';

export const signup = async ({ fingerprint }) => {
  const { authorization } = (await apiCall({ method: 'POST', service: 'signup', fingerprint })) || {};

  return authorization;
};

export const syncStatus = async ({ settings: { authorization, secret } }) =>
  apiCall({
    service: 'state',
    headers: { authorization, secret },
  });

export const sync = async ({ key, block, blocks, wipe, settings: { authorization, secret } }) => {
  if (!authorization || !secret) return false;

  const response = await apiCall({
    method: 'POST',
    service: 'sync',
    headers: { authorization, secret },
    key,
    block,
    blocks,
    wipe,
  });

  return response ? true : false;
};

export const blockchain = async ({ blockchain, settings: { authorization, secret } }) =>
  apiCall({
    method: 'POST',
    service: 'blockchain',
    headers: { authorization, secret },
    blockchain,
  });

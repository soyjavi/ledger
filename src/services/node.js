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

export const sync = async ({ settings: { authorization, secret }, ...others }) => {
  if (!authorization || !secret) return false;

  const response = await apiCall({
    method: 'POST',
    service: 'sync',
    headers: { authorization, secret },
    ...others,
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

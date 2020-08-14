import { apiCall } from './modules';

export const signup = async ({ fingerprint }) => {
  const { authorization } = (await apiCall({ method: 'POST', service: 'signup', fingerprint })) || {};

  return authorization;
};

export const getSyncStatus = async ({ settings: { authorization, secret } }) =>
  apiCall({
    service: 'state',
    headers: { authorization, secret },
  });

export const sync = async ({ key, block, blocks, settings: { authorization, secret } }) => {
  const response = await apiCall({
    method: 'POST',
    service: 'sync',
    headers: { authorization, secret },
    key,
    block,
    blocks,
  });

  return response ? true : false;
};

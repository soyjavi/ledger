import { apiCall } from './modules';

export const ServiceNode = {
  ready: () => apiCall({ service: 'status' }),

  signup: async ({ fingerprint }) => {
    const { authorization } = (await apiCall({ method: 'POST', service: 'signup', fingerprint }).catch(() => {})) || {};

    return authorization;
  },

  status: ({ settings: { authorization, secret } }) =>
    apiCall({
      service: 'state',
      headers: { authorization, secret },
    }),

  sync: async ({ settings: { authorization, secret }, ...others }) => {
    if (!authorization || !secret) return false;

    const response = await apiCall({
      method: 'POST',
      service: 'sync',
      headers: { authorization, secret },
      ...others,
    });

    return response ? true : false;
  },

  blockchain: ({ blockchain, settings: { authorization, secret } }) =>
    apiCall({
      method: 'POST',
      service: 'blockchain',
      headers: { authorization, secret },
      blockchain,
    }),
};

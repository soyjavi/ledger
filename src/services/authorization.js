import { apiCall } from './modules';

const getAuthorization = async (store, pin) => {
  const { onError, fingerprint } = store;

  const { hash } = await apiCall({ method: 'POST', service: 'signup', fingerprint })
    .catch(onError) || {};

  const next = { authorization: hash, pin };
  await store.save(next);

  return next;
};

export { getAuthorization };

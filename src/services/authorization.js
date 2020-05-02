import { apiCall } from './modules';

export const getAuthorization = async (store, snackbar, pin) => {
  const { fingerprint } = store;
  const { snackbarError } = snackbar;

  const { hash } =
    (await apiCall({ method: 'POST', service: 'signup', fingerprint }).catch((error) =>
      snackbarError(error.message),
    )) || {};

  const next = { authorization: hash, pin };
  await store.save(next);

  return next;
};

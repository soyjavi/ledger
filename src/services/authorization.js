import { apiCall } from './modules';

export const getAuthorization = async (settings, snackbar) => {
  const { fingerprint } = settings;
  const { snackbarError } = snackbar;

  const { hash: authorization } =
    (await apiCall({ method: 'POST', service: 'signup', fingerprint }).catch((error) =>
      snackbarError(error.message),
    )) || {};

  return authorization;
};

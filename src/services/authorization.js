import { apiCall } from './modules';

export const getAuthorization = async (settings, snackbar) => {
  const { fingerprint } = settings;

  const { authorization } =
    (await apiCall({ method: 'POST', service: 'signup', fingerprint }).catch((error) =>
      snackbar.error(error.message),
    )) || {};

  return authorization;
};

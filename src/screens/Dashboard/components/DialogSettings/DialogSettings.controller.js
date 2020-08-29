import * as Permissions from 'expo-permissions';

import { ServiceRates, blockchain } from '@services';

export const askCamera = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === 'granted';
};

export const changeCurrency = async ({ currency, l10n, snackbar, store: { updateRates, updateSettings } }) => {
  await updateSettings({ baseCurrency: currency });
  const rates = await ServiceRates.get({ baseCurrency: currency }).catch(() =>
    snackbar.error(l10n.ERROR_SERVICE_RATES),
  );
  if (rates) await updateRates(rates);
};

export const getBlockchain = async ({ qr, store: { settings } }) => await blockchain({ blockchain: qr, settings });

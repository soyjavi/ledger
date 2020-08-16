import * as Permissions from 'expo-permissions';

import { getRates, blockchain } from '@services';

export const askCamera = async ({ setHasCamera }) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  setHasCamera(status === 'granted');
};

export const changeCurrency = async ({ currency, l10n, snackbar, store: { updateRates, updateSettings } }) => {
  await updateSettings({ baseCurrency: currency });

  const rates = await getRates({ baseCurrency: currency }).catch(() => snackbar.error(l10n.ERROR_SERVICE_RATES));
  if (rates) await updateRates(rates);
};

export const getBlockchain = async ({ qr, store: { settings } }) => await blockchain({ blockchain: qr, settings });
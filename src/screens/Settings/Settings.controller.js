import * as Permissions from 'expo-permissions';

import { ServiceRates, ServiceNode } from '@services';

const askCamera = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === 'granted';
};

const changeCurrency = async ({ currency, l10n, snackbar, store: { updateRates, updateSettings } }) => {
  await updateSettings({ baseCurrency: currency });
  const rates = await ServiceRates.get({ baseCurrency: currency, latest: false }).catch(() =>
    snackbar.error(l10n.ERROR_SERVICE_RATES),
  );
  if (rates) await updateRates(rates);
};

const getBlockchain = async ({ qr, store: { settings } }) => await ServiceNode.blockchain({ blockchain: qr, settings });

const getLatestRates = async ({
  l10n,
  snackbar,
  store: {
    settings: { baseCurrency },
    updateRates,
  },
}) => {
  const rates = await ServiceRates.get({ baseCurrency, latest: true }).catch(() =>
    snackbar.error(l10n.ERROR_SERVICE_RATES),
  );
  if (rates) await updateRates(rates);
};

export { askCamera, changeCurrency, getBlockchain, getLatestRates };

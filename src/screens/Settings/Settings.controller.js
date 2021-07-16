import { Notification } from '@lookiero/aurora';
import * as Permissions from 'expo-permissions';

import { L10N } from '@common';
import { ServiceRates, ServiceNode } from '@services';

const askCamera = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === 'granted';
};

const changeCurrency = async ({ currency, Stack, store: { updateRates, updateSettings } }) => {
  await updateSettings({ baseCurrency: currency });
  const rates = await ServiceRates.get({ baseCurrency: currency, latest: false }).catch(() =>
    Stack.alert('rates', Notification, { text: L10N.ERROR_SERVICE_RATES, timeoutClose: 10000 }),
  );
  if (rates) await updateRates(rates);
};

const getBlockchain = async ({ qr, store: { settings } }) => await ServiceNode.blockchain({ blockchain: qr, settings });

const getLatestRates = async ({
  Stack,
  store: {
    settings: { baseCurrency },
    updateRates,
  },
}) => {
  const rates = await ServiceRates.get({ baseCurrency, latest: true }).catch(() =>
    Stack.alert('rates', Notification, { text: L10N.ERROR_SERVICE_RATES, timeoutClose: 10000 }),
  );
  if (rates) await updateRates(rates);
};

export { askCamera, changeCurrency, getBlockchain, getLatestRates };

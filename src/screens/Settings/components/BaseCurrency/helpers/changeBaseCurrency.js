import { Notification } from '@lookiero/aurora';

import { L10N } from '@common';
import { ServiceRates } from '@services';

export const changeBaseCurrency = async ({ currency, Stack, store: { updateRates, updateSettings } }) => {
  await updateSettings({ baseCurrency: currency });
  const rates = await ServiceRates.get({ baseCurrency: currency, latest: false }).catch(() =>
    Stack.alert('rates', Notification, { text: L10N.ERROR_SERVICE_RATES, timeoutClose: 10000 }),
  );
  if (rates) await updateRates(rates);
};

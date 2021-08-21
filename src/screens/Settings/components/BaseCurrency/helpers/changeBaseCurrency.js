import { L10N } from '@common';
import { Notification } from '@components';
import { ServiceRates } from '@services';

export const changeBaseCurrency = async ({ currency, Stack, store: { updateRates } }) => {
  const rates = await ServiceRates.get({ baseCurrency: currency, latest: false }).catch(() =>
    Stack.alert('rates', Notification, { text: L10N.ERROR_SERVICE_RATES, timeoutClose: 10000 }),
  );

  if (rates) await updateRates(rates, currency);
};

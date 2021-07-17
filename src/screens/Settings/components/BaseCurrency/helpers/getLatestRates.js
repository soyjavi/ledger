import { Notification } from '@lookiero/aurora';

import { L10N } from '@common';
import { ServiceRates } from '@services';

export const getLatestRates = async ({
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

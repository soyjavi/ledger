import { C } from '@common';

import { apiCall } from './modules';

const { CURRENCY } = C;

export const getRates = async ({ baseCurrency = CURRENCY, snackbar }) =>
  apiCall({ service: `rates?baseCurrency=${baseCurrency}` }).catch((error) => snackbar.error(error.message));

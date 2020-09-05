import { C } from '@common';

import { apiCall } from './modules';

const { CURRENCY } = C;

export const ServiceRates = {
  get: ({ baseCurrency = CURRENCY, latest = false } = {}) =>
    apiCall({ service: `rates?baseCurrency=${baseCurrency}${latest ? '&latest=true' : ''}` }),
};

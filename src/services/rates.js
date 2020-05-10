import { C } from '@common';

import { apiCall } from './modules';

const { CURRENCY } = C;

export const getRates = async (baseCurrency = CURRENCY) => apiCall({ service: `rates?baseCurrency=${baseCurrency}` });

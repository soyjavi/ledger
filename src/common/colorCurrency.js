import { THEME } from 'reactor/common';

import { C } from './constants';

const { CURRENCY_COLOR, CURRENCY } = C;
const { COLOR } = THEME;

export const colorCurrency = (currency = CURRENCY) => CURRENCY_COLOR[currency] || COLOR.TEXT;

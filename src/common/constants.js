import { Platform } from 'react-native';

import PKG from '../../package.json';

// eslint-disable-next-line no-undef
const IS_DEV = __DEV__;
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const MS_IN_WEEK = MS_IN_DAY * 7;

export const C = {
  BUSY_PRESS_MS: 2500,

  CURRENCY: 'USD',

  DELAY_PRESS_MS: 500,

  ENDPOINT: IS_DEV ? 'http://localhost:8080' : 'https://ledgernode.soyjavi.com',

  EXPENSE_AS_INVESTMENT: 5,

  FIXED: {
    BTC: 8,
    ETH: 4,
    IDR: 0,
    JPY: 0,
    PLN: 0,
    THB: 0,
    XAU: 0,
    XAG: 0,
  },

  INTERNAL_TRANSFER: 99,
  IS_DEV,

  LANGUAGE: 'en-EN',

  MS_IN_DAY,
  MS_IN_WEEK,

  NAME: 'com.soyjavi.money',

  STATS_MONTHS_LIMIT: 18,
  SYMBOL: {
    AUD: 'AU$',
    // BGN: '',
    // BRL: 'AU$',
    BTC: Platform.OS === 'android' && Platform.Version < 26 ? 'Ƀ' : '₿',
    // CAD: 'CA$',
    // CHF: 'SFr',
    CNY: '¥',
    // CZK: 'Kč',
    // DKK: 'Dkr',
    GBP: '£',
    ETH: 'Ξ',
    EUR: '€',
    HKD: 'HK$',
    // HRK: '',
    // HUF: 'Ft',
    // IDR: 'Rp',
    // ILS: '₪',
    // INR: 'Rs',
    // ISK: '',
    JPY: '¥',
    KRW: '₩',
    MXN: 'Mex$',
    MYR: 'RM',
    // NOK: 'Kr',
    // NZD: 'NZD$',
    // PHP: '₱',
    // PLN: 'zł',
    // RON: '',
    RUB: '₽',
    // SEK: 'Kr',
    SGD: 'S$',
    THB: '฿',
    // TRY: '',
    USD: '$',
    VND: '₫',
    XAU: 'gr',
    XAG: 'gr',
    // ZAR: 'R',
  },

  TIMEOUT: {
    BUSY: 40,
    GET: 10000,
    POST: 60000,
    CONNECTION: 10000,
    CONNECTION_STABLE: 30000,
    SYNC: 60000,
  },

  TX: {
    TYPE: {
      EXPENSE: 0,
      INCOME: 1,
      TRANSFER: 2,
    },
  },

  VERSION: PKG.version,

  WIPE: 0,
};

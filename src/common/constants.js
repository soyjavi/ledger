import { Platform } from 'react-native';

import PKG from '../../package.json';

const IS_DEV = __DEV__;
const IS_ANDROID = Platform.OS === 'android';
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const MS_IN_WEEK = MS_IN_DAY * 7;

export default {
  BUSY_PRESS_MS: 2500,

  CURRENCY: 'EUR',
  CURRENCY_COLOR: {
    AUD: '#A3D6D4',
    BTC: '#ff9900',
    CNY: '#c58293',
    GBP: '#d1c5db',
    EUR: '#5d7ea7',
    HKD: '#dbc1b9',
    JPY: '#F47C7C',
    KRW: '#70A1D7',
    MXN: '#A1DE93',
    MYR: '#FFD050',
    RUB: '#1aa6b7',
    SGD: '#FF6962',
    THB: '#B19CD9',
    USD: '#b5cb8f',
    VND: '#bc658d',
    XAU: '#ffd700',
    XAG: '#666666',
  },

  DELAY_PRESS_MS: 500,

  ENDPOINT: IS_DEV ? 'http://192.168.1.104:8080' : 'https://ledger-node.glitch.me',

  FIXED: {
    BTC: 6,
    IDR: 0,
    JPY: 0,
    PLN: 0,
    THB: 0,
    XAU: 0,
    XAG: 0,
  },

  IS_DEV,

  LANGUAGE: 'en-EN',

  MS_IN_DAY,
  MS_IN_WEEK,

  // NAME: PKG.name,
  NAME: 'ledger',

  SCREEN: {
    DASHBOARD: 'dashboard',
    SESSION: 'session',
    SETTINGS: 'settings',
    STATS: 'stats',
    VAULT: 'vault',
    VAULTS: 'vaults',
  },
  STATS_MONTHS_LIMIT: 18,
  SYMBOL: {
    AUD: 'AU$',
    // BGN: '',
    // BRL: 'AU$',
    BTC: IS_ANDROID && Platform.Version < 26 ? 'Ƀ' : '₿',
    // CAD: 'CA$',
    // CHF: 'SFr',
    CNY: '¥',
    // CZK: 'Kč',
    // DKK: 'Dkr',
    GBP: '£',
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

  VAULT_TRANSFER: 99,
  VERSION: PKG.version,

  WIPE: 0,
};

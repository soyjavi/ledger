import { Platform } from 'react-native';

import { LAYOUT, THEME } from '../reactor/common';
import PKG from '../../package.json';

const { UNIT } = THEME;
const { VIEWPORT: { W, H } } = LAYOUT;

// const DEV = __DEV__ ? __DEV__ : { hello: 'world' }; // eslint-disable-line;
// const isDev = packagerOpts && packagerOpts.dev;

const IS_PRODUCTION = false;
const IS_ANDROID = Platform.OS === 'android';

export default {
  VAULT_TRANSFER: 99,
  COLORS: [
    '#9d47b6', '#0fbde9', '#e6639b', '#ffb129', '#0c5061', '#6141da', '#f74440',
    '#f87c44', '#1B1464', '#6F1E51', '#d6e06b', '#7c50b9', '#ffcc41', '#f88181',
  ],

  ENDPOINT: IS_PRODUCTION ? 'https://voltvault.glitch.me' : 'http://localhost:8080',

  FIXED: {
    BTC: 6,
    IDR: 0,
    JPY: 0,
    PLN: 0,
    THB: 0,
  },

  LANGUAGE: 'en-EN',
  LOCATION_PROPS: { enableHighAccuracy: true },

  MS_IN_WEEK: 1000 * 7 * 24 * 60 * 60,

  NAME: PKG.name,

  SCREEN: {
    SESSION: 'Session',
    DASHBOARD: 'Dashboard',
    STATS: 'Stats',
    VAULT: 'Vault',
  },
  STYLE: {
    BALANCE_CARD_HEIGHT: UNIT * 21.6,
    DIALOG: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    HEADER_HEIGHT: UNIT * 5.8,
    NOTCH_HEIGHT: IS_ANDROID && (H / W > 1.95) ? 36 : 0,
    SLIDER_MONTHS_HEIGHT: UNIT * 3,
    THUMBNAIL_SIZE: UNIT * 4,
  },
  SYMBOL: {
    AUD: 'AU$',
    // BGN: '',
    BRL: 'AU$',
    BTC: IS_ANDROID && Platform.Version < 26 ? 'Ƀ' : '₿',
    CAD: 'CA$',
    CHF: 'SFr',
    // CNY: '',
    CZK: 'Kč',
    DKK: 'Dkr',
    GBP: '£',
    EUR: '€',
    HKD: 'HK$',
    // HRK: '',
    HUF: 'Ft',
    IDR: 'Rp',
    ILS: '₪',
    INR: 'Rs',
    // ISK: '',
    JPY: '¥',
    KRW: '₩',
    MXN: 'Mex$',
    MYR: 'RM',
    NOK: 'Kr',
    NZD: 'NZD$',
    PHP: '₱',
    PLN: 'zł',
    // RON: '',
    RUB: 'руб.',
    SEK: 'Kr',
    SGD: 'S$',
    THB: '฿',
    // TRY: '',
    USD: '$',
    ZAR: 'R',
  },

  TX: {
    TYPE: {
      EXPENSE: 0,
      INCOME: 1,
      TRANSFER: 2,
    },
  },

  VERSION: PKG.version,

  WEEKS: 28,
};

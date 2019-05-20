import { Platform } from 'react-native';

import { LAYOUT, THEME } from '../reactor/common';
import PKG from '../../package.json';

const { BORDER_RADIUS, SPACE, UNIT } = THEME;

// const DEV = __DEV__ ? __DEV__ : { hello: 'world' }; // eslint-disable-line;
// const isDev = packagerOpts && packagerOpts.dev;

const IS_PRODUCTION = true;
const IS_ANDROID = Platform.OS === 'android';
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const MS_IN_WEEK = MS_IN_DAY * 7;

export default {
  CURRENCY: 'EUR',

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

  MS_IN_DAY,
  MS_IN_WEEK,

  NAME: PKG.name,

  SCREEN: {
    DASHBOARD: 'Dashboard',
    SESSION: 'Session',
    SETTINGS: 'Settings',
    STATS: 'Stats',
    VAULT: 'Vault',
  },
  SETTINGS: {
    HIDE_OVERALL_BALANCE: 0,
    NIGHT_MODE: 3,
    SHOW_VAULT_CURRENCY: 1,
  },
  STYLE: {
    CARD: {
      borderRadius: BORDER_RADIUS,
      overflow: 'hidden',
      padding: SPACE.MEDIUM,
    },
    DIALOG: {
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    DIALOG_FRAME: {
      margin: 0,
    },
    FOOTER_HEIGHT: UNIT * 7.6,
    HEADER_HEIGHT: UNIT * 5.2,
    VAULT_ITEM_WIDTH: (LAYOUT.VIEWPORT.W / 2) - (SPACE.MEDIUM * 3),
  },
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
    EUR: ' €',
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
    // SGD: 'S$',
    THB: '฿',
    // TRY: '',
    USD: '$',
    VND: '₫',
    // ZAR: 'R',
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

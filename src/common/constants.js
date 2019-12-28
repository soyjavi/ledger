import { Platform } from 'react-native';

import { LAYOUT, THEME } from '../reactor/common';
import PKG from '../../package.json';

const { COLOR, SPACE, UNIT } = THEME;

const IS_PRODUCTION = false;
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
    XAU: 0,
    XAG: 0,
  },

  IS_DEV: !IS_PRODUCTION,
  IS_PRODUCTION,

  LANGUAGE: 'en-EN',

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
  STYLE: {
    CONTENT: {
      backgroundColor: COLOR.WHITE,
      borderRadius: SPACE.MEDIUM,
      marginTop: SPACE.XS,
      paddingTop: SPACE.S,
    },
    DIALOG: {
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    DIALOG_FRAME: {
      borderTopLeftRadius: SPACE.MEDIUM,
      borderTopRightRadius: SPACE.MEDIUM,
      margin: 0,
      width: LAYOUT.VIEWPORT.W,
    },
    HEADER_HEIGHT: UNIT * 5.2,
    VAULT_ITEM_WIDTH: (LAYOUT.VIEWPORT.W / 2) - SPACE.XL,
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

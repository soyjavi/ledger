import { Platform } from 'react-native';

import { THEME } from '../reactor/common';
import PKG from '../../package.json';

const { ELEVATION, SPACE, OFFSET, UNIT } = THEME;

// const DEV = __DEV__ ? __DEV__ : { hello: 'world' }; // eslint-disable-line;
// const isDev = packagerOpts && packagerOpts.dev;

const CARD_WIDTH = UNIT * 16;
const IS_PRODUCTION = false;
const IS_ANDROID = Platform.OS === 'android';

export default {
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
    VAULT: 'Vault',
    STATS: 'Stats',
  },
  SLIDER: {
    itemMargin: 0,
    itemWidth: CARD_WIDTH + OFFSET,
  },
  STYLE: {
    BALANCE_CARD_HEIGHT: UNIT * 21.6,
    CARD: {
      ...ELEVATION.CARD,
      borderRadius: UNIT,
      overflow: 'hidden',
      paddingVertical: SPACE.S,
      paddingHorizontal: SPACE.MEDIUM,
      width: CARD_WIDTH,
    },
    DIALOG: {
      backgroundColor: 'rgba(255,255,255,0.75)',
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    DIALOG_FRAME: {
      borderTopLeftRadius: UNIT,
      borderTopRightRadius: UNIT,
      margin: 0,
    },
    HEADER_HEIGHT: UNIT * 5.8,
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
    HKD: 'HKD',
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

  VAULT_TRANSFER: 99,
  VERSION: PKG.version,

  WIPE: 0,
};

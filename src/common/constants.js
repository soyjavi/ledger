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
    '#21ce99',
    '#FFC312', '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67',
    '#F79F1F', '#A3CB38', '#1289A7', '#D980FA', '#B53471',
    '#EE5A24', '#009432', '#0652DD', '#9980FA', '#833471',
    '#EA2027', '#006266', '#1B1464', '#5758BB', '#6F1E51',
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

  NAME: PKG.name,

  SCREEN: {
    SESSION: 'Session',
    DASHBOARD: 'Dashboard',
    STATS: 'Stats',
    VAULT: 'Vault',
  },
  STYLE: {
    DIALOG: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'flex-end',
    },
    HEADER_HEIGHT: UNIT * 5.8,
    HEADER_EXTENDED_HEIGHT: UNIT * 16,
    NOTCH_HEIGHT: IS_ANDROID && (H / W > 1.95) ? 36 : 0,
    SLIDER_MONTHS_HEIGHT: UNIT * 3,
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
};

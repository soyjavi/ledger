import { Platform } from 'react-native';

import { LAYOUT, THEME } from '../reactor/common';
import PKG from '../../package.json';

const { COLOR, OFFSET, UNIT } = THEME;
const { VIEWPORT: { W, H } } = LAYOUT;

// const DEV = __DEV__ ? __DEV__ : { hello: 'world' }; // eslint-disable-line;
// const isDev = packagerOpts && packagerOpts.dev;

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
    STATS: 'Stats',
    VAULT: 'Vault',
  },
  STYLE: {
    BALANCE_CARD_HEIGHT: UNIT * 21.6,
    CARD: {
      borderRadius: UNIT,
      overflow: 'hidden',
      paddingTop: OFFSET * 0.9,
      paddingHorizontal: OFFSET,
      paddingBottom: OFFSET,
      width: UNIT * 16,
    },
    DIALOG: {
      backgroundColor: 'rgba(255,255,255,0.75)',
      justifyContent: 'flex-end',
      zIndex: 2,
    },
    DIALOG_FRAME: {
      borderRadius: UNIT * 2.2,
      margin: OFFSET,
    },
    FOOTER: {
      ...LAYOUT.STYLE.ROW,
      justifyContent: 'space-between',
      padding: OFFSET,
    },

    HEADER_HEIGHT: UNIT * 5.8,
    NOTCH_HEIGHT: IS_ANDROID && (H / W > 1.95) ? 36 : 0,
    SHADOW: {
      shadowColor: COLOR.BLACK,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0.1,
      shadowRadius: OFFSET * 1,
      ...Platform.select({
        android: { elevation: 4 },
      }),
    },
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

  WEEKS: 28,
};

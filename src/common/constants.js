import { Platform } from 'react-native';

import { LAYOUT, THEME } from '../reactor/common';
import PKG from '../../package.json';

const { OFFSET, UNIT } = THEME;
const { VIEWPORT: { W, H } } = LAYOUT;

// const DEV = __DEV__ ? __DEV__ : { hello: 'world' }; // eslint-disable-line;
// const isDev = packagerOpts && packagerOpts.dev;

const IS_PRODUCTION = false;
const IS_ANDROID = Platform.OS === 'android';
const NOTCH_HEIGHT = (IS_ANDROID && parseInt(H / W, 10) > 2) ? 25 : 0;

export default {
  COLORS: [
    '#7C4DFF', '#00C09A', '#639CEB', '#CA66BD', '#28BC34', '#50CDEA', '#F45D88',
    '#8460D0', '#FF7233', '#69F0AE', '#FF4081', '#FFD740', '#536DFE', '#FF5252',
  ],

  ENDPOINT: IS_PRODUCTION ? 'https://voltvault.glitch.me' : 'http://localhost:8080',

  LANGUAGE: 'en-EN',

  NAME: PKG.name,

  SCREEN: {
    SESSION: 'session',
    DASHBOARD: 'dashboard',
    VAULT: 'vault',
    TRANSACTION: 'transaction',
  },
  STYLE: {
    BANNER: {
      alignSelf: 'center',
      height: UNIT * 19.2,
      marginTop: OFFSET,
      width: UNIT * 28.8,
    },
    DASHBOARD_HEIGHT: UNIT * 16,
    HEADER_HEIGHT: UNIT * 5.8,
    NOTCH_HEIGHT,
  },
  SYMBOL: {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    THB: '฿',
    BTC: IS_ANDROID && Platform.Version < 26 ? 'Ƀ' : '₿',
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

import { Platform } from 'react-native';

import { THEME } from '../reactor/common';
import PKG from '../../package.json';

const { OFFSET, UNIT } = THEME;

export default {
  COLORS: [
    '#7C4DFF', '#00C09A', '#639CEB', '#CA66BD', '#28BC34', '#50CDEA', '#F45D88',
    '#8460D0', '#FF7233', '#69F0AE', '#FF4081', '#FFD740', '#536DFE', '#FF5252',
  ],

  LANGUAGE: 'en-EN',

  NAME: PKG.name,

  SCREEN: {
    SESSION: 'session',
    DASHBOARD: 'dashboard',
    VAULT: 'vault',
    TRANSACTION: 'transaction',
  },
  STYLE: {
    DASHBOARD_HEIGHT: UNIT * 16,
    HEADER_HEIGHT: UNIT * 5.8,
    BANNER: {
      alignSelf: 'center',
      height: UNIT * 20,
      marginVertical: OFFSET,
      width: UNIT * 30,
    },
  },
  SYMBOL: {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    THB: '฿',
    BTC: Platform.OS === 'android' && Platform.Version < 26 ? 'Ƀ' : '₿',
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

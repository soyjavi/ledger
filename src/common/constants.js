import { Platform } from 'react-native';

import { THEME } from 'reactor/common';
import PKG from '../../package.json';

const { UNIT } = THEME;

export default {
  COLORS: ['#00C09A', '#8460D0', '#639CEB', '#CA66BD', '#28BC34', '#50CDEA', '#F45D88', '#FF7233'],
  CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'THB', 'BTC'],

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

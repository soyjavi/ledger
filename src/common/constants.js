import { THEME } from 'reactor/common';
import PKG from '../../package.json';

const { UNIT } = THEME;

export default {
  COLORS: ['#00C09A', '#8460D0', '#639CEB', '#CA66BD', '#28BC34', '#50CDEA', '#F45D88', '#FF7233'],
  CURRENCIES: ['USD', 'EUR', 'THB', 'BTC'],

  LANGUAGE: 'en-EN',

  NAME: PKG.name,

  SCREEN: {
    SESSION: 'session',
    PROFILE: 'profile',
    DASHBOARD: 'dashboard',
    VAULT: 'vault',
    TRANSACTION: 'transaction',
  },
  STYLE: {
    HEADER_HEIGHT: UNIT * 5.8,
  },
  SYMBOL: {
    USD: '$',
    EUR: 'E',
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

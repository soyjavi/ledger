import { THEME } from 'reactor/common';
import PKG from '../../package.json';

const { UNIT } = THEME;

export default {
  CURRENCIES: ['USD', 'EUR', 'THB', 'BTC'],

  LANGUAGE: 'en-EN',

  NAME: PKG.name,

  SCREEN: {
    SESSION: 'session',
    PROFILE: 'profile',
    SUMMARY: 'summary',
    TRANSACTION: 'transaction',
  },
  STYLE: {
    HEADER_HEIGHT: UNIT * 5.8,
  },

  TX: {
    TYPE: {
      EXPENSE: 'expense',
      INCOME: 'income',
      TRANSFER: 'transfer',
    },
  },

  VERSION: PKG.version,
};

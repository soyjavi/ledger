import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

const FAMILY = IS_WEB ? 'Google Sans' : 'google-sans';
const FAMILY_BOLD = IS_WEB ? 'Google Sans' : 'google-sans-bold';
const WEIGHT = { REGULAR: '400', BOLD: '700' };

export default {
  COLOR: {
    BACKGROUND: '#fff',
    BACKGROUND_OPACITY: 'rgba(255,255,255,0.9)',
    BASE: '#eee',
    TEXT: '#333',
    TEXT_LIGHTEN: '#999',
    // DARK-MODE
    // BACKGROUND: '#000',
    // BACKGROUND_OPACITY: 'rgba(0,0,0,0.9)',
    // BASE: '#333',
    // TEXT: '#fff',
    // TEXT_LIGHTEN: '#aaa',
    PRIMARY: '#6141da',

    EXPENSES: '#f74440',
    INCOMES: '#21ce99',
  },

  FONT: {
    DEFAULT: {
      fontFamily: FAMILY,
      fontWeight: WEIGHT.REGULAR,
    },
    HEADLINE: {
      fontFamily: FAMILY_BOLD,
      fontWeight: IS_WEB ? WEIGHT.BOLD : WEIGHT.REGULAR,
    },
    SUBTITLE: {
      fontFamily: FAMILY_BOLD,
      fontWeight: IS_WEB ? WEIGHT.BOLD : WEIGHT.REGULAR,
    },
    CAPTION: {},
    BUTTON: {
      fontFamily: FAMILY_BOLD,
      fontWeight: IS_WEB ? WEIGHT.BOLD : WEIGHT.REGULAR,
    },
    INPUT: {
      fontFamily: FAMILY,
      fontWeight: WEIGHT.REGULAR,
    },
  },
};

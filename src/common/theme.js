import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

const FAMILY = IS_WEB ? 'Product Sans' : 'product-sans';
const FAMILY_BOLD = IS_WEB ? 'Product Sans' : 'product-sans-bold';
const WEIGHT = { REGULAR: '400', BOLD: '700' };

export default {
  COLOR: {
    BACKGROUND: '#FDFDFF',
    BACKGROUND_OPACITY: 'rgba(255,255,255,0.9)',
    BASE: '#F8F8F8',

    TEXT: '#333',
    TEXT_LIGHTEN: '#999',
    PRIMARY: '#7966FF',
    ACCENT: '#01C654',

    // DARK-MODE
    // BACKGROUND: '#000',
    // BACKGROUND_OPACITY: 'rgba(0,0,0,0.9)',
    // BASE: 'rgba(255,255,255,0.1)',
    // TEXT: '#fff',
    // TEXT_LIGHTEN: '#aaa',

    EXPENSES: '#FF6262',
    INCOMES: '#17D0BC',
  },

  FONT: {
    FAMILY,
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
      letterSpacing: -0.1,
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

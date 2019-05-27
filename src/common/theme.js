import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

const FAMILY = IS_WEB ? 'Product Sans' : 'product-sans';
const FAMILY_BOLD = IS_WEB ? 'Product Sans' : 'product-sans-bold';
const WEIGHT = { REGULAR: '400', BOLD: '700' };

export default {
  COLOR: {
    BACKGROUND_OPACITY: 'rgba(255,255,255,0.9)',
    BASE: '#F0F0F0',
    EXPENSES: '#FF6262',
    INCOMES: '#17D0BC',
    PRIMARY: '#7966FF',
    TEXT: '#333',
    TEXT_LIGHTEN: '#999',
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

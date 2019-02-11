import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

const FAMILY = IS_WEB ? 'Product Sans' : 'product-sans';
const FAMILY_BOLD = IS_WEB ? 'Product Sans' : 'product-sans-bold';
const WEIGHT = { REGULAR: '400', BOLD: '700' };

export default {
  COLOR: {
    BACKGROUND: '#fff',
    BACKGROUND_OPACITY: 'rgba(255,255,255,0.9)',
    BASE: '#F2F2F2',
    TEXT: '#333',
    TEXT_LIGHTEN: '#999',
    // PRIMARY: '#3434E6',
    PRIMARY: '#43DDDD',

    // DARK-MODE
    // BACKGROUND: '#000',
    // BACKGROUND_OPACITY: 'rgba(0,0,0,0.9)',
    // BASE: 'rgba(255,255,255,0.1)',
    // TEXT: '#fff',
    // TEXT_LIGHTEN: '#aaa',
    // PRIMARY: '#43DDDD',

    EXPENSES: '#f74440',
    INCOMES: '#43DDDD',
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

import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

const FAMILY = 'product-sans';
const FAMILY_BOLD = 'product-sans-bold';
const WEIGHT = { REGULAR: '400', BOLD: '700' };

export default {
  BORDER_RADIUS: 6,

  COLOR: {
    BACKGROUND: '#000',
    BACKGROUND_INPUT: '#202020',
    BACKGROUND_OPACITY: 'rgba(16, 16, 16, 0.85)',
    BASE: '#202020',
    TEXT: '#ffffff',
    TEXT_LIGHTEN: '#808080',

    PRIMARY: '#ffffff',

    // ACCENT: '#7966FF',
    // EXPENSE: '#E9305C',
    INCOME: '#43e97b',
    // TRANSFER: '#4066EA',
    // LOCATION: '#A6FE01',

    ACCENT: '#FFC700',
    EXPENSE: '#FF3986',
    // INCOME: '#24F2AD',
    TRANSFER: '#7218FF',
    LOCATION: '#2F9BFF',

    WARNING: '#EDE622',
    ERROR: '#E9305C',

    BTC: '#f4b659',
    EUR: '#0251b5',
    USD: '#d90122',
    XAU: '#FFD700',
    XAG: '#c0c0c0',
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
    CAPTION: {
      // fontSize: UNIT * 1.3,
    },
    BUTTON: {
      fontFamily: FAMILY_BOLD,
      fontWeight: IS_WEB ? WEIGHT.BOLD : WEIGHT.REGULAR,
    },
    INPUT: {},
  },
};

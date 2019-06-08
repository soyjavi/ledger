import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

const FAMILY = IS_WEB ? 'Product Sans' : 'product-sans';
const FAMILY_BOLD = IS_WEB ? 'Product Sans' : 'product-sans-bold';
const WEIGHT = { REGULAR: '400', BOLD: '700' };

export default {
  // BORDER_RADIUS: 4,

  COLOR: {
    BACKGROUND: '#000',
    BACKGROUND_INPUT: '#202020',
    BACKGROUND_OPACITY: 'rgba(16, 16, 16, 0.85)',
    BASE: '#202020',
    TEXT: '#ffffff',
    TEXT_LIGHTEN: '#808080',

    // PRIMARY: '#4066EA',
    // PRIMARY: '#00AFFF',
    // PRIMARY: '#38f9d7',
    // INCOMES: '#00C989',
    // LOCATION: '#7966FF',

    PRIMARY: '#ffffff',
    ACCENT: '#A6FE01',
    EXPENSE: '#E9305C',
    INCOME: '#43e97b',
    TRANSFER: '#4066EA',
    WARNING: '#EDE622',
    ERROR: '#F03301',
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

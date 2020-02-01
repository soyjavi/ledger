const FAMILY = 'font-family';
const FAMILY_BOLD = 'font-family-bold';

const INCOME = '#94febf'; //  #24F2AD #94febf
const EXPENSE = '#FF3986'; // #E9305C #FF3986

export default {
  COLOR: {
    BACKGROUND: '#000000',
    BACKGROUND_INPUT: '#000000',
    BACKGROUND_OPACITY: 'rgba(16, 16, 16, 0.85)',
    BASE: '#333333',
    TEXT: '#ffffff',
    TEXT_LIGHTEN: '#808080',

    PRIMARY: INCOME,
    ACCENT: '#041711',

    ERROR: EXPENSE,
    SUCCESS: INCOME,

    EXPENSE,
    INCOME,
    TRANSFER: '#ffffff',

    BTC: '#f4b659',
    EUR: '#0251b5',
    USD: '#d90122',
    XAU: '#FFD700',
    XAG: '#c0c0c0',
  },

  FONT: {
    FAMILY,
    FAMILY_BOLD,

    DEFAULT: {
      fontFamily: FAMILY,
    },
    HEADLINE: {
      fontFamily: FAMILY_BOLD,
      letterSpacing: -0.75,
    },
    SUBTITLE: {
      fontFamily: FAMILY_BOLD,
      fontSize: 16,
      letterSpacing: -0.5,
    },
    BODY: {
      fontSize: 14,
      letterSpacing: -0.5,
      lineHeight: 14 * 1.5,
    },
    CAPTION: {
      fontSize: 11,
      letterSpacing: -0.1,
    },
    BOLD: {
      fontFamily: FAMILY_BOLD,
      fontWeight: '400',
    },
    BUTTON: {
      fontSize: 16,
      fontFamily: FAMILY_BOLD,
      fontWeight: 'normal',
    },
    BUTTON_SMALL: {
      lineHeight: 15,
      fontSize: 12,
      fontFamily: FAMILY_BOLD,
      letterSpacing: -0.1,
    },
    INPUT: {
      fontFamily: FAMILY_BOLD,
      fontSize: 14,
    },
  },

  OPACITY: {
    S: 0.2,
    M: 0.4,
    L: 0.6,
  },

  MOTION: {
    // DURATION: 225,
    // TYPE: 'spring',
    DEFAULTS: {
      // friction: undefined,
      // tension: undefined,
      // speed: undefined,
      // bounciness: undefined,
      // useNativeDriver: true,
    },
  },
};

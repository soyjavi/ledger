const FAMILY = 'font-family';
const FAMILY_BOLD = 'font-family-bold';

const INCOME = '#63C88B'; // '#94febf'; //  #24F2AD #94febf
const EXPENSE = '#F77A64'; // '#FF3986'; // #E9305C #FF3986

const BACKGROUND = '#000';
const LIGHTEN = '#555';

const UNIT = 8;

export default {
  BORDER_RADIUS: UNIT / 4,

  COLOR: {
    BRAND: INCOME,
    CTA: '#ffffff',
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND,
    // DISABLED
    ERROR: EXPENSE,
    SUCCESS: INCOME,
    TEXT: '#ffffff',
    // TRANSPARENT

    // -- Custom
    CHART_BASE: '#222',
    LIGHTEN,
    OVERLAY: 'rgba(16, 16, 16, 0.8)',
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
      fontWeight: '400',
      fontSize: 30,
      letterSpacing: -0.75,
    },
    SUBTITLE: {
      fontFamily: FAMILY_BOLD,
      fontWeight: '400',
      fontSize: 18,
      letterSpacing: -0.5,
    },
    BODY: {
      fontSize: 14,
      letterSpacing: -0.5,
      lineHeight: 14 * 1.5,
    },
    CAPTION: {
      fontSize: 11,
      letterSpacing: -0.5,
    },
    LEGEND: {
      fontSize: 10,
      lineHeight: 10,
      letterSpacing: -0.3,
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
    INPUT: {
      fontFamily: FAMILY_BOLD,
      fontSize: 14,
    },
  },

  INPUT: {
    backgroundColor: BACKGROUND,
    borderColor: LIGHTEN,
    // borderRadius: 0,
    // borderWidth: 1,
    // paddingHorizontal: UNIT,
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

  // OPACITY: {
  //   S: 0.2,
  //   M: 0.4,
  //   L: 0.6,
  // },
};

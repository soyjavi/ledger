const FAMILY = 'font-family';
const FAMILY_BOLD = 'font-family-bold';

const INCOME = '#63C88B';
const EXPENSE = '#F77A64';

const BASE = '#222222';
const DIALOG = '#131313';
const UNIT = 8;
const BORDER_RADIUS = UNIT / 2;

export default {
  BORDER_RADIUS,

  COLOR: {
    BRAND: INCOME,
    CTA: '#ffffff',
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND: '#000000',
    BASE,
    ERROR: EXPENSE,
    SUCCESS: INCOME,
    TEXT: '#ffffff',
    // TRANSPARENT

    // -- Custom
    LIGHTEN: '#555555', // '#4E4E4E'
    OVERLAY: 'rgba(0, 0, 0, 0.8)',
    EXPENSE,
    INCOME,
    // LOCATION: '#ECAF6E',
    TRANSFER: '#7393DC',
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
      fontSize: 32,
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

  DIALOG: {
    borderTopLeftRadius: UNIT * 2,
    borderTopRightRadius: UNIT * 2,
    padding: UNIT * 2,
    backgroundColor: DIALOG,
  },
  DIALOG_OVERLAY: {
    // backgroundColor: 'rgba(0,0,0,0.8)',
  },

  INPUT: {
    backgroundColor: BASE,
    borderColor: DIALOG,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    // paddingHorizontal: UNIT,
  },
  INPUT_FOCUS: {},

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

  OPACITY: {
    S: 0.2,
    M: 0.4,
    L: 0.6,
  },
};

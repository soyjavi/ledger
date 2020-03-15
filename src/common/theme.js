import { THEME } from '../reactor/common';

const { SPACE } = THEME;

const FONT_FAMILY = {
  fontFamily: 'font-family',
  fontWeight: '400',
};

const FONT_FAMILY_BOLD = {
  fontFamily: 'font-family-bold',
  fontWeight: '400',
};

const FONT_FAMILY_PRICE = {
  fontFamily: 'font-family-price',
  fontWeight: '400',
};

const INCOME = '#63C88B';
const EXPENSE = '#F77A64';

const BASE = '#222222';
const DIALOG = '#131313';
const BORDER_RADIUS = SPACE.XS;
const OVERLAY = 'rgba(0, 0, 0, 0.8)';

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
    LIGHTEN: '#555555', // '#4E4E4E',
    OVERLAY,
    EXPENSE,
    INCOME,
    // LOCATION: '#ECAF6E',
    TRANSFER: '#7393DC',
  },

  FONT: {
    DEFAULT: FONT_FAMILY,
    HEADLINE: {
      ...FONT_FAMILY_BOLD,
      fontSize: 32,
      letterSpacing: 0,
    },
    SUBTITLE: {
      ...FONT_FAMILY_BOLD,
      fontSize: 18,
    },
    BODY: {
      fontSize: 14,
      lineHeight: 14 * 1.5,
    },
    CAPTION: {
      fontSize: 11,
    },
    LEGEND: {
      fontSize: 10,
      lineHeight: 10,
    },
    PRICE: FONT_FAMILY_PRICE,

    BOLD: FONT_FAMILY_BOLD,
    BUTTON: {
      ...FONT_FAMILY_BOLD,
      fontSize: 16,
    },
    INPUT: {
      ...FONT_FAMILY_BOLD,
      fontSize: 14,
    },
  },

  DIALOG: {
    backgroundColor: DIALOG,
    borderRadius: SPACE.L,
    marginBottom: SPACE.S,
    padding: SPACE.L,
  },
  DIALOG_BUTTON: {
    color: 'rgba(255, 255, 255, 0.1)',
  },
  DIALOG_OVERLAY: {
    backgroundColor: OVERLAY,
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

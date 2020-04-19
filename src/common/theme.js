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

const INCOME = '#00FB92';
const EXPENSE = '#fb5662';

const BACKGROUND = '#000000';
const BASE = '#181818';
const BORDER_RADIUS = SPACE.XS;
const DIALOG = '#0C0C0C';
const OVERLAY = 'rgba(0, 0, 0, 0.8)';
const TEXT = '#ffffff';
const LIGHTEN = '#555555';

export default {
  BORDER_RADIUS,

  COLOR: {
    BRAND: INCOME,
    CTA: '#ffffff',
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND,
    BASE,
    ERROR: EXPENSE,
    SUCCESS: INCOME,
    TEXT,
    // TRANSPARENT

    // -- Custom
    LIGHTEN,
    OVERLAY,
    EXPENSE,
    INCOME,
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
      letterSpacing: -0.5,
    },
    BODY: {
      fontSize: 13,
      lineHeight: 13 * 1.5,
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
    borderRadius: SPACE.M,
    // marginBottom: SPACE.M,
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
    S: 0.15,
    M: 0.4,
    L: 0.6,
  },
};

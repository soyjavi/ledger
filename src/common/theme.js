import { Platform } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

const FONT_FAMILY_HEADLINE = {
  fontFamily: 'font-family-headline',
  fontWeight: '500',
};

const FONT_FAMILY = {
  fontFamily: 'font-family',
  fontWeight: '400',
};

const FONT_FAMILY_MEDIUM = {
  fontFamily: 'font-family-medium',
  fontWeight: '500',
};

const FONT_FAMILY_SEMIBOLD = {
  fontFamily: 'font-family-semibold',
  fontWeight: '600',
};

// LIGHT-MODE
// const BACKGROUND = '#ffffff';
// const BASE = '#rgba(246, 246, 249, 1)';
// const CTA = '#000000';
// const DIALOG = '#ffffff';
// const OVERLAY = 'rgba(255, 255, 255, 0.8)';
// const TEXT = '#1A1A1A';
// const LIGHTEN = '#B3B3B3';

// DARK-MODE
const BACKGROUND = '#080909';
const BASE = '#252525'; //'#262828';
const CTA = '#fefdfa';
const DIALOG = '#19191B';
const OVERLAY = 'rgba(0, 0, 0, 0.95)';
const TEXT = '#fefdfa';
const LIGHTEN = 'rgba(255,255,255,0.6)';

const BORDER_RADIUS = SPACE.S;

const ELEVATION = {
  shadowColor: '#000000',
  shadowOffset: { height: 0, width: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 32,
  ...Platform.select({
    android: { elevation: 24 },
  }),
};

export default {
  BORDER_RADIUS,

  COLOR: {
    // BRAND: '#3DDC84',
    // BRAND_OPACITY: 'rgba(0, 192, 123, 0.1)',
    BRAND: '#01c07b',
    BRAND_OPACITY: 'rgba(1, 192, 123, 0.1)',

    CTA,
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND,
    BASE,
    DIALOG,
    ERROR: '#fb5662',
    // SUCCESS,
    TEXT,
    // TRANSPARENT

    // -- Custom
    LIGHTEN,
    OVERLAY,
  },

  ELEVATION,

  FONT: {
    DEFAULT: FONT_FAMILY,
    SECONDARY: FONT_FAMILY_HEADLINE,
    BOLD: FONT_FAMILY_MEDIUM,
    EXTRA_BOLD: FONT_FAMILY_SEMIBOLD,
    HEADLINE: {
      ...FONT_FAMILY_HEADLINE,
      fontSize: 36,
    },
    SUBTITLE: {
      ...FONT_FAMILY_HEADLINE,
      fontSize: 24,
    },
    BODY: {
      fontSize: 14,
      lineHeight: 14 * 1.5,
    },
    CAPTION: {
      fontSize: 11,
    },
    LEGEND: {
      fontSize: 9,
      lineHeight: 9,
    },
    BUTTON: {
      ...FONT_FAMILY_SEMIBOLD,
      fontSize: 12,
      letterSpacing: 0.1,
    },
    BUTTON_SMALL: {
      fontSize: 11,
    },
    INPUT: {
      ...FONT_FAMILY_MEDIUM,
      fontSize: 14,
    },
  },

  ICON: {
    FAMILY: 'SimpleLineIcons',
  },

  DIALOG: {
    ...ELEVATION,
    backgroundColor: DIALOG,
    borderRadius: SPACE.M,
    padding: SPACE.L,
  },
  DIALOG_BUTTON: {
    color: BASE,
  },
  DIALOG_OVERLAY: {
    backgroundColor: OVERLAY,
  },
  INPUT: {
    backgroundColor: BACKGROUND,
    borderColor: BASE,
    borderWidth: 0,
    borderBottomWidth: 10,
    paddingHorizontal: 0,
  },
  INPUT_FOCUS: {
    borderColor: LIGHTEN,
  },

  MOTION: {
    EXPAND: 250,
    COLLAPSE: 200,

    // TYPE: 'standard',
    DEFAULTS: {
      // friction: undefined,
      // tension: undefined,
      // speed: undefined,
      // bounciness: undefined,
      // useNativeDriver: Platform.OS !== 'web',
      useNativeDriver: false,
    },
  },

  OPACITY: {
    S: 0.15,
    M: 0.4,
    L: 0.6,
  },

  SNACKBAR: {
    borderRadius: SPACE.XS,
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.S,
    margin: SPACE.S,
    ...Platform.select({
      android: { elevation: 0 },
    }),
  },
};

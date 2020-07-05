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

const FONT_FAMILY_BOLD = {
  fontFamily: 'font-family-bold',
  fontWeight: '500',
};

const BACKGROUND = '#ffffff';
const BASE = '#rgba(246, 246, 249, 1)';
const BORDER_RADIUS = SPACE.S;
const LIGHTEN = '#B3B3B3';
const OVERLAY = 'rgba(255, 255, 255, 0.8)';
const TEXT = '#1A1A1A';

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
    BRAND: '#19CEAB',
    BRAND_HIGHLIGHT: 'rgba(25, 206, 171, 0.075)',
    CTA: '#000000',
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND,
    BASE,
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
    BOLD: FONT_FAMILY_BOLD,
    HEADLINE: {
      ...FONT_FAMILY_HEADLINE,
      fontSize: 36,
    },
    SUBTITLE: {
      ...FONT_FAMILY_HEADLINE,
      fontSize: 24,
    },
    BODY: {
      fontSize: 13,
      lineHeight: 13 * 1.5,
    },
    CAPTION: {
      fontSize: 11,
    },
    LEGEND: {
      fontSize: 9,
      lineHeight: 9,
    },
    BUTTON: {
      ...FONT_FAMILY_BOLD,
      fontSize: 10,
      letterSpacing: 1,
    },
    INPUT: {
      ...FONT_FAMILY_BOLD,
      fontSize: 13,
    },
  },

  ICON: {
    FAMILY: 'SimpleLineIcons',
  },

  DIALOG: {
    ...ELEVATION,
    backgroundColor: BACKGROUND,
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
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  INPUT_FOCUS: {
    borderColor: LIGHTEN,
  },

  MOTION: {
    // EXPAND: 250,
    // COLLAPSE: 200,
    // TYPE: 'standard',
    DEFAULTS: {
      // friction: undefined,
      // tension: undefined,
      // speed: undefined,
      // bounciness: undefined,
      // useNativeDriver: Platform.OS !== 'web',
      useNativeDriver: 'false',
      // useNativeDriver: false,
    },
  },

  OPACITY: {
    S: 0.15,
    M: 0.4,
    L: 0.6,
  },

  SNACKBAR: {
    borderRadius: 0,
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.M,
  },
};

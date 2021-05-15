import { Platform } from 'react-native';
import { THEME } from 'reactor/common';

import { colorOpacity } from './colorOpacity';
const { SPACE } = THEME;

const FONT_FAMILY = {
  fontFamily: 'font-family',
  fontWeight: '400',
};

const FONT_FAMILY_BOLD = {
  fontFamily: 'font-family-bold',
  fontWeight: '700',
};

const FONT_FAMILY_CURRENCY = {
  fontFamily: 'font-family-currency',
  fontWeight: '900',
};

const OPACITY = {
  S: 0.15,
  M: 0.3,
  L: 0.75,
};

// DARK-MODE
const BACKGROUND = '#000';
const TEXT = '#FFFFFF';
const BASE = '#262626';
const CTA = '#FFFFFF';
// Custom
const BASE_LIGHTEN = colorOpacity(TEXT, 0.08);
const LIGHTEN = colorOpacity(TEXT, 0.45);

const ELEVATION = {
  shadowColor: BACKGROUND,
  shadowOffset: { height: 0, width: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 32,
  ...Platform.select({
    android: { elevation: 24 },
  }),
};

export const theme = {
  BAR_SIZE: SPACE.S + SPACE.XS / 4,
  BLUR: {
    intensity: 95,
    tint: 'dark',
  },
  BORDER_RADIUS: SPACE.XS,

  COLOR: {
    // BRAND: '#D29776',
    // BRAND: 'rgba(242, 255, 55, 0.9)',
    BRAND: '#FFC491',
    CTA,
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND,
    BASE,
    ERROR: '#ff8056',
    // SUCCESS,
    TEXT,
    // TRANSPARENT

    // -- Custom
    BASE_LIGHTEN,
    LIGHTEN,
  },

  ELEVATION,

  FONT: {
    DEFAULT: FONT_FAMILY,
    BOLD: FONT_FAMILY_BOLD,
    HEADLINE: {
      fontSize: 34,
      letterSpacing: -1,
    },
    SUBTITLE: {
      fontSize: 20,
      letterSpacing: -0.5,
    },
    BODY: {
      fontSize: 14,
      letterSpacing: -0.25,
    },
    CAPTION: {
      fontSize: 11,
    },

    BUTTON: {
      ...FONT_FAMILY_BOLD,
      fontSize: 12,
    },
    BUTTON_SMALL: {
      fontSize: 11,
    },
    INPUT: {
      fontSize: 20,
    },

    // -- Custom
    LEGEND: {
      fontSize: 8,
    },
    CURRENCY: {
      ...FONT_FAMILY_CURRENCY,
      letterSpacing: 0,
    },
  },

  ICON: {
    FAMILY: 'SimpleLineIcons',
  },

  DIALOG: {
    ...ELEVATION,
    backgroundColor: BASE,
    borderTopLeftRadius: SPACE.M,
    borderTopRightRadius: SPACE.M,
    padding: SPACE.L,
  },
  DIALOG_OVERLAY: {
    backgroundColor: colorOpacity(BACKGROUND, OPACITY.L),
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
    // EXPAND: 250,
    // COLLAPSE: 200,
    // TYPE: 'standard',
    DEFAULTS: {
      //   friction: undefined,
      //   tension: undefined,
      //   speed: undefined,
      //   bounciness: undefined,
      //   useNativeDriver: Platform.OS !== 'web',
      useNativeDriver: false,
    },
  },

  OPACITY,

  SNACKBAR: {
    ...Platform.select({
      android: { elevation: 0 },
    }),
  },
};

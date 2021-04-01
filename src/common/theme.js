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

const OPACITY = {
  S: 0.15,
  M: 0.3,
  L: 0.75,
};

const BRAND = '#D29776';

// LIGHT-MODE
// const BACKGROUND = '#ffffff';
// const BASE = '#F1F1F1';
// const BORDER_RADIUS = SPACE.S;
// const CTA = '#111111';
// const DIALOG = '#F5F5F5';
// const TEXT = '#111111';
// const LIGHTEN = colorOpacity(TEXT, 0.4);

// DARK-MODE
const BACKGROUND = '#101010';
const BASE = '#1D1D1D';
const BORDER_RADIUS = SPACE.S;
const CTA = '#fefdfa';
const DIALOG = '#171717';
const TEXT = '#fefdfa';
const LIGHTEN = colorOpacity(TEXT, 0.4);

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
  BAR_SIZE: SPACE.S,
  BLUR: {
    intensity: 95,
    tint: 'dark',
  },
  BORDER_RADIUS,

  COLOR: {
    BRAND,
    CTA,
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
    DIALOG,
    LIGHTEN,
  },

  ELEVATION,

  FONT: {
    DEFAULT: FONT_FAMILY,
    BOLD: FONT_FAMILY_BOLD,
    HEADLINE: {
      fontSize: 34,
    },
    SUBTITLE: {
      fontSize: 20,
    },
    BODY: {
      fontSize: 14,
      letterSpacing: 0.25,
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
      letterSpacing: 0,
    },
  },

  ICON: {
    FAMILY: 'SimpleLineIcons',
  },

  DIALOG: {
    ...ELEVATION,
    backgroundColor: DIALOG,
    borderRadius: BORDER_RADIUS * 2,
    padding: SPACE.L,
  },
  DIALOG_BUTTON: {
    color: BASE,
  },
  DIALOG_OVERLAY: {
    backgroundColor: colorOpacity(BACKGROUND, OPACITY.M),
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
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.S,
    marginHorizontal: SPACE.M,
    marginVertical: SPACE.M,
    ...Platform.select({
      android: { elevation: 0 },
    }),
  },
};

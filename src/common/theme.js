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

// LIGHT-MODE
// const BACKGROUND = '#ffffff';
// const BASE = '#F1F1F1'; //'#F5F5F5';
// const CTA = '#23272B';
// const DIALOG = '#ffffff';
// const OVERLAY = 'rgba(255, 255, 255, 0.8)';
// const TEXT = '#000000';
// const LIGHTEN = '#A3A3A3';

// DARK-MODE
const BACKGROUND = '#000000';
// const BASE = '#181818';
const BASE = '#222222';
const CTA = '#fefdfa';
const DIALOG = '#111111';
const OVERLAY = colorOpacity(BACKGROUND, OPACITY.L);
const TEXT = '#fefdfa';
const LIGHTEN = 'rgba(255,255,255,0.6)';

const ELEVATION = {
  shadowColor: '#000000',
  shadowOffset: { height: 0, width: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 32,
  ...Platform.select({
    android: { elevation: 24 },
  }),
};

export const theme = {
  BAR_SIZE: SPACE.S,

  BORDER_RADIUS: 4,

  COLOR: {
    BRAND: '#D29776',
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
    LIGHTEN,
    OVERLAY,
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
      ...FONT_FAMILY,
      fontSize: 14,
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

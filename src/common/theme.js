import { Platform } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

const FONT_FAMILY = {
  fontFamily: 'font-family',
  fontWeight: '400',
};

const FONT_FAMILY_BOLD = {
  fontFamily: 'font-family-bold',
  fontWeight: '800',
};

const FONT_FAMILY_CURRENCY = {
  fontFamily: 'font-family-currency',
  fontWeight: '400',
};

// LIGHT-MODE
const BACKGROUND = '#ffffff';
const BASE = '#F1F1F1'; //'#F5F5F5';
const CTA = '#23272B';
const CTA_HIGHLIGHT = '#222222';
const OVERLAY = 'rgba(255, 255, 255, 0.8)';
const TEXT = '#000000';
const TEXT_DISABLED = '#C8C9C9';
const TEXT_LIGHTEN = '#A3A3A3';
const LIGHTEN = '#A3A3A3';
const RIPPLE = LIGHTEN;

// DARK-MODE
// const BACKGROUND = '#121212';
// const BASE = '#191919'; //'#262828';
// const CTA = '#fefdfa';
// const CTA_HIGHLIGHT = 'rgba(0, 0, 0, 0.2)';
// const OVERLAY = 'rgba(0, 0, 0, 0.8)';
// const TEXT = '#fefdfa';
// const TEXT_DISABLED = '#C8C9C9';
// const TEXT_LIGHTEN = '#A3A3A3';
// const LIGHTEN = 'rgba(255,255,255,0.6)';
// const RIPPLE = LIGHTEN;

const INPUT = '#666';

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
  BORDER_RADIUS: 2,

  COLOR: {
    BRAND: '#0c8',

    CTA,
    // BLACK
    // WHITE
    // GRAY

    BACKGROUND,
    BASE,
    // ERROR: '#fb5662',
    ERROR: '#f36',
    // SUCCESS,
    TEXT,
    // TRANSPARENT

    // -- Custom
    INCOME: '#0c8',
    EXPENSE: '#f36',
    TEXT_DISABLED,
    TEXT_LIGHTEN,
    CTA_HIGHLIGHT,
    LIGHTEN,
    OVERLAY,
    RIPPLE,
  },

  ELEVATION,

  FONT: {
    DEFAULT: FONT_FAMILY,
    BOLD: FONT_FAMILY_BOLD,
    HEADLINE: {
      fontSize: 34,
      letterSpacing: -0.5,
    },
    SUBTITLE: {
      fontSize: 20,
      letterSpacing: -0.25,
    },
    BODY: {
      fontSize: 14,
      letterSpacing: -0.1,
    },
    CAPTION: {
      fontSize: 11,
      letterSpacing: -0.05,
    },

    BUTTON: {
      ...FONT_FAMILY_BOLD,
      fontFamily: 'font-family-bold',
      fontWeight: '800',
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
      ...FONT_FAMILY_CURRENCY,
      letterSpacing: 0,
    },
  },

  ICON: {
    FAMILY: 'SimpleLineIcons',
  },

  DIALOG: {
    ...ELEVATION,
    backgroundColor: BACKGROUND,
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

  OPACITY: {
    S: 0.15,
    M: 0.4,
    L: 0.6,
  },

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

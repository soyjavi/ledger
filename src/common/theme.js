import { ENV } from '../reactor/common';

const { IS_WEB } = ENV;

export default {
  BORDER_RADIUS: 0,

  COLOR: {
    BACKGROUND: '#fff',
    BACKGROUND_OPACITY: 'rgba(255,255,255,0.9)',
    // DARK-MODE
    // BACKGROUND: '#000',
    // BACKGROUND_OPACITY: 'rgba(0,0,0,0.9)',
    // BASE: '#333',

    PRIMARY: '#FAAC18',
    SECONDARY: '#03DAC6',
  },

  FONT: {
    FAMILY: IS_WEB ? 'Product Sans' : undefined,
    FAMILY_SECONDARY: IS_WEB ? 'Product Sans' : undefined,
  },
};

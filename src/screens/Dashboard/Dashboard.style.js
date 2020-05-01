import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { HEADER_HEIGHT } from '@components';

const { SPACE, FONT } = THEME;

export default StyleSheet.create({
  smallButton: {
    ...FONT.BUTTON,
    paddingHorizontal: 0,
  },

  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  vaults: {
    marginBottom: SPACE.M,
  },
});

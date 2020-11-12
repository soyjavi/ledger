import { Platform, StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { colorOpacity } from '@common';

const { BORDER_RADIUS, COLOR, FONT, OPACITY, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    ...FONT.BODY,
    ...FONT.BOLD,
    backgroundColor: colorOpacity(COLOR.BACKGROUND, OPACITY.M),
    borderRadius: BORDER_RADIUS / 2,
    borderWidth: 0,
    color: COLOR.TEXT,
    flex: 2,
    height: SPACE.XL + SPACE.S,
    marginRight: SPACE.S,
    paddingHorizontal: SPACE.S,
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },
});

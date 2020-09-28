import { Platform, StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    ...FONT.BODY,
    ...FONT.BOLD,
    backgroundColor: COLOR.CTA_HIGHLIGHT,
    borderRadius: BORDER_RADIUS / 2,
    borderWidth: 0,
    color: COLOR.BACKGROUND,
    flex: 2,
    height: SPACE.XL + SPACE.S,
    marginRight: SPACE.S,
    paddingHorizontal: SPACE.S,
    ...Platform.select({
      web: {
        userSelect: 'none',
        outline: 'none',
      },
    }),
  },
});

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
    borderColor: COLOR.BASE,
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    color: COLOR.TEXT,
    height: SPACE.XXL,
    paddingHorizontal: SPACE.M,
    width: '100%',
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },

  focus: {
    borderColor: COLOR.TEXT,
    backgroundColor: COLOR.BACKGROUND,
  },
});

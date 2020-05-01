import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    borderColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    width: 'auto',
    backgroundColor: COLOR.BASE,
  },

  focus: {
    borderColor: COLOR.TEXT,
  },

  input: {
    ...FONT.INPUT,
    color: COLOR.TEXT,
    borderWidth: 0,
    flex: 2,
    height: SPACE.XL + SPACE.S,
  },
});

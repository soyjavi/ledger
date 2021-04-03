import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const CONTAINER_HEIGHT = SPACE.XXL + SPACE.L;

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLOR.BASE,
    borderColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    padding: SPACE.M,
    height: CONTAINER_HEIGHT,
    minHeight: CONTAINER_HEIGHT,
  },

  focus: {
    backgroundColor: COLOR.TRANSPARENT,
    borderColor: COLOR.TEXT,
  },

  input: {
    ...FONT.BOLD,
    ...FONT.INPUT,
    color: COLOR.TEXT,
    padding: 0,
    margin: 0,
    width: '100%',
  },
});

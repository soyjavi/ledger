import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const CONTAINER_HEIGHT = SPACE.XXL + SPACE.L;

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLOR.BASE_LIGHTEN,
    borderRadius: BORDER_RADIUS,
    padding: SPACE.M,
    height: CONTAINER_HEIGHT,
    minHeight: CONTAINER_HEIGHT,
  },

  input: {
    ...FONT.BOLD,
    ...FONT.INPUT,
    color: COLOR.TEXT,
    padding: 0,
    margin: 0,
    width: '100%',
  },

  inputFocus: {
    color: COLOR.TEXT,
  },
});

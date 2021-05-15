import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const CONTAINER_HEIGHT = SPACE.XXL + SPACE.L;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    borderColor: COLOR.TRANSPARENT,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    height: CONTAINER_HEIGHT,
    padding: SPACE.M,
    width: '100%',
  },

  active: {
    borderColor: COLOR.TEXT,
  },

  fulfilled: {
    backgroundColor: COLOR.TRANSPARENT,
  },

  input: {
    ...FONT.BOLD,
    ...FONT.INPUT,
  },

  textInput: {
    height: CONTAINER_HEIGHT,
    margin: 0,
    opacity: 0,
    padding: 0,
    position: 'absolute',
    right: -SPACE.M,
    textAlign: 'left',
    top: -SPACE.M,
    width: '100%',
  },
});

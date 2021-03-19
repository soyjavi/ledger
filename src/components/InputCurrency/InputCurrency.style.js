import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const CONTAINER_HEIGHT = SPACE.XXL + SPACE.L;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE_LIGHTEN,
    borderRadius: BORDER_RADIUS,
    height: CONTAINER_HEIGHT,
    padding: SPACE.M,
    width: '100%',
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
    top: -SPACE.M,
    width: '100%',
  },
});

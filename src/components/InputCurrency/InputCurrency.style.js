import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const HEIGHT = SPACE.XL;

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLOR.BASE_LIGHTEN,
    borderRadius: BORDER_RADIUS,
    padding: SPACE.M,
  },

  input: {
    ...FONT.BOLD,
    ...FONT.INPUT,
  },

  textInput: {
    bottom: 0,
    height: HEIGHT,
    left: 0,
    margin: 0,
    textAlign: 'center',
    opacity: 0,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
});

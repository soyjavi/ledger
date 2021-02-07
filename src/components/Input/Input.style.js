import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, FONT, SPACE } = THEME;

const HEIGHT = SPACE.XXL;

export default StyleSheet.create({
  container: {
    width: '100%',
  },

  value: {
    minWidth: SPACE.L,
    height: HEIGHT,
    lineHeight: HEIGHT,
  },

  input: {
    ...FONT.BOLD,
    ...FONT.INPUT,
    color: COLOR.TEXT,
    padding: 0,
    margin: 0,
    height: HEIGHT,
    width: '100%',
    textAlign: 'center',
  },

  inputFocus: {
    color: COLOR.TEXT,
  },

  inputCurrency: {
    height: HEIGHT,
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
});

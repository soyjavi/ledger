import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, FONT, SPACE } = THEME;

const HEIGHT = SPACE.XXL;

export default StyleSheet.create({
  container: {
    width: '100%',
  },

  content: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BASE,
  },

  focus: {
    borderBottomColor: COLOR.TEXT,
  },

  value: {
    minWidth: SPACE.L,
    height: HEIGHT,
    lineHeight: HEIGHT,
  },

  input: {
    ...FONT.DEFAULT,
    ...FONT.SUBTITLE,
    color: COLOR.TEXT,
    padding: 0,
    margin: 0,
    height: HEIGHT,
    width: '100%',
    textAlign: 'center',
  },

  inputCurrency: {
    position: 'absolute',
    left: 0,
    opacity: 0,
    width: '100%',
  },
});

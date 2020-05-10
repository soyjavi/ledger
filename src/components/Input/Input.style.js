import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    width: '100%',
  },

  content: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BASE,
  },

  focus: {
    borderBottomColor: COLOR.LIGHTEN,
  },

  value: {
    minWidth: SPACE.L,
  },

  input: {
    padding: 0,
    margin: 0,
    height: SPACE.XXL,
    width: '100%',
  },

  inputCurrency: {
    position: 'absolute',
    left: 0,
    height: SPACE.XXL,
    opacity: 0,
  },

  inputText: {
    ...FONT.SUBTITLE,
    textAlign: 'center',
  },
});

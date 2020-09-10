import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE, UNIT } = THEME;

const HEIGHT = SPACE.XXL + UNIT;

export default StyleSheet.create({
  container: {
    width: '100%',
  },

  content: {
    // borderRadius: BORDER_RADIUS,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BASE,
    // borderWidth: 1,
    // borderColor: COLOR.BASE,
    // backgroundColor: COLOR.BASE,
  },

  focus: {
    borderBottomColor: COLOR.TEXT,
    // backgroundColor: COLOR.BACKGROUND,
    // borderColor: COLOR.TEXT,
  },

  filled: {},

  value: {
    minWidth: SPACE.L,
    height: HEIGHT,
    lineHeight: HEIGHT * 1.1,
  },

  input: {
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

import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;

const { COLOR, SPACE, UNIT } = THEME;
const ICON_SIZE = UNIT * 3.6;
const DATE_FONT_SIZE = UNIT * 1.6;
const MONTH_FONT_SIZE = UNIT * 0.9;

export default StyleSheet.create({
  button: {
    flex: 1,
    marginTop: SPACE.S,
  },

  buttonSeparator: {
    width: SPACE.S,
  },

  container: {},

  content: {
    paddingVertical: SPACE.XS,
  },

  date: {
    fontSize: DATE_FONT_SIZE,
    lineHeight: DATE_FONT_SIZE,
  },

  dialog: {
    ...DIALOG,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: DIALOG_FRAME,

  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    paddingTop: SPACE.XXS,
    marginRight: UNIT,
    width: ICON_SIZE,
  },

  month: {
    fontSize: MONTH_FONT_SIZE,
    lineHeight: MONTH_FONT_SIZE,
  },

  prices: {
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },
});

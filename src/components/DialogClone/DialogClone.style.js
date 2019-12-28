import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;

const { COLOR, SPACE, UNIT } = THEME;
const MONTH_FONT_SIZE = UNIT * 0.9;

export default StyleSheet.create({
  box: {
    marginRight: UNIT,
  },

  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: UNIT * 0.2,
  },

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

  dialog: {
    ...DIALOG,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: DIALOG_FRAME,

  month: {
    fontSize: MONTH_FONT_SIZE,
    lineHeight: MONTH_FONT_SIZE,
    letterSpacing: -0.25,
  },

  prices: {
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },
});

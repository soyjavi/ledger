import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
    marginTop: SPACE.S,
  },

  buttonSeparator: {
    width: SPACE.S,
  },

  dialog: {
    ...DIALOG,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: {
    ...DIALOG_FRAME,
  },

  info: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    padding: SPACE.MEDIUM,
    marginVertical: SPACE.MEDIUM,
  },

  map: {
    marginVertical: SPACE.S,
  },

  prices: {
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },
});

import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;

const {
  BORDER_RADIUS, COLOR, ELEVATION, SPACE, UNIT,
} = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
    marginTop: SPACE.S,
  },

  buttonSeparator: {
    width: SPACE.S,
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  info: {
    ...ELEVATION.SMALL,
    borderRadius: BORDER_RADIUS,
    borderWidth: UNIT * 0.1,
    borderColor: COLOR.BASE,
    padding: SPACE.MEDIUM,
    marginVertical: SPACE.MEDIUM,
  },

  map: {
    marginVertical: SPACE.S,
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    flex: 1,
  },
});

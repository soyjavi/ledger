import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;

const {
  COLOR, OFFSET, UNIT, SPACE,
} = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
    marginTop: OFFSET / 2,
  },

  buttonSeparator: {
    width: SPACE.S,
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  info: {
    borderRadius: OFFSET,
    borderWidth: UNIT * 0.1,
    borderColor: COLOR.BASE,
    padding: OFFSET,
    marginVertical: OFFSET,
  },

  map: {
    marginVertical: OFFSET / 2,
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    flex: 1,
  },
});

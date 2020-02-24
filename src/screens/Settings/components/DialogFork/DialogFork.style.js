import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  button: {
    marginTop: SPACE.S,
    flex: 1,
  },

  dialog: {
    ...STYLE.DIALOG,
    backgroundColor: COLOR.OVERLAY,
  },

  frame: {
    ...STYLE.DIALOG_FRAME,
    backgroundColor: COLOR.EXPENSE,
  },
});

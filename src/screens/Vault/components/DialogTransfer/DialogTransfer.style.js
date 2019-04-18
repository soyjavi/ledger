import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { LAYOUT, THEME } from '../../../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  form: {
    marginVertical: SPACE.MEDIUM,
  },
});

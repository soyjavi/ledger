import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;
const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  form: {
    marginVertical: OFFSET,
  },

  location: {
    marginTop: OFFSET / 2,
    marginBottom: UNIT / 2,
  },
});

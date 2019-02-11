import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;
const { BORDER_RADIUS, OFFSET, UNIT } = THEME;

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
    borderRadius: BORDER_RADIUS,
    marginTop: OFFSET / 2,
    marginBottom: UNIT / 2,
  },
});

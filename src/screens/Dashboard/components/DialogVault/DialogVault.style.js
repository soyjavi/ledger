import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  dialog: STYLE.DIALOG,

  frame: STYLE.DIALOG_FRAME,

  form: {
    marginVertical: SPACE.MEDIUM,
  },

  currencies: {
    marginBottom: SPACE.REGULAR,
    marginTop: SPACE.XS,
  },
});

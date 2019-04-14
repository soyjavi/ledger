import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  categories: {
    marginBottom: SPACE.REGULAR,
    marginTop: SPACE.XS,
  },

  dialog: STYLE.DIALOG,

  frame: STYLE.DIALOG_FRAME,

  form: {
    marginVertical: SPACE.MEDIUM,
  },

  location: {
    marginVertical: SPACE.XXS,
  },
});

import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE, UNIT } = THEME;
const CARD_WIDTH = UNIT * 7.2;

export { CARD_WIDTH };

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  card: {
    width: CARD_WIDTH,
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

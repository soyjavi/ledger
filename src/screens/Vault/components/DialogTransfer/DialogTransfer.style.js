import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;
const { SPACE, UNIT } = THEME;
const CARD_WIDTH = UNIT * 9.6;

export { CARD_WIDTH };

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  card: {
    width: CARD_WIDTH,
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  form: {
    marginVertical: SPACE.MEDIUM,
  },

  vaults: {
    marginBottom: SPACE.MEDIUM,
    marginTop: SPACE.XS,
  },
});

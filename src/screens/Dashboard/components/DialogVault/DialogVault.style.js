import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { UNIT } = THEME;
const CARD_WIDTH = UNIT * 8;

export { CARD_WIDTH };

export default StyleSheet.create({
  card: {
    width: CARD_WIDTH,
  },

  dialog: STYLE.DIALOG,

  dialogOverlay: STYLE.DIALOG_OVERLAY,
});

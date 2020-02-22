import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE, UNIT } = THEME;
const CARD_WIDTH = UNIT * 9.6;

export { CARD_WIDTH };

export default StyleSheet.create({
  card: {
    minHeight: CARD_WIDTH,
    width: CARD_WIDTH,
  },

  cards: {
    flexDirection: 'row',
    marginBottom: SPACE.M,
    marginTop: SPACE.XS,
  },

  dialogOverlay: STYLE.DIALOG_OVERLAY,

  dialog: STYLE.DIALOG,
});

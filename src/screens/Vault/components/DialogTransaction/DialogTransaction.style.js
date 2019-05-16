import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { COLOR, SPACE, UNIT } = THEME;
const CARD_WIDTH = UNIT * 9.6;

export { CARD_WIDTH };

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  card: {
    paddingHorizontal: 0,
    width: CARD_WIDTH,
  },

  cardOption: {
    flex: 1,
    width: '100%',
  },

  cardLast: {
    marginRight: 0,
  },

  cards: {
    flexDirection: 'row',
    marginBottom: SPACE.REGULAR,
    marginTop: SPACE.XS,
  },

  dialog: {
    ...STYLE.DIALOG,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: STYLE.DIALOG_FRAME,

  form: {
    marginBottom: SPACE.MEDIUM,
  },
});

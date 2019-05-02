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

  cards: {
    marginBottom: SPACE.REGULAR,
    marginTop: SPACE.XS,
  },

  dialog: {
    ...STYLE.DIALOG,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: {
    ...STYLE.DIALOG_FRAME,
  },

  form: {
    marginVertical: SPACE.MEDIUM,
  },

  location: {
    marginVertical: SPACE.XXS,
  },
});

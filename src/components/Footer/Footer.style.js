import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR, SPACE } = THEME;
const { STYLE } = C;

export default StyleSheet.create({
  buttonBack: {
    marginRight: SPACE.S,
  },

  buttonOption: {
    marginBottom: SPACE.S,
  },

  card: {
    flex: 1,
    width: '100%',
  },

  cardLast: {
    marginRight: 0,
  },

  cards: {
    ...LAYOUT.STYLE.ROW,
    width: LAYOUT.VIEWPORT.W - (SPACE.MEDIUM * 2),
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    bottom: 0,
    justifyContent: 'flex-end',
    height: STYLE.FOOTER_HEIGHT,
    paddingHorizontal: SPACE.MEDIUM,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    width: '100%',
    zIndex: 2,
  },

  dialog: {
    ...STYLE.DIALOG,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: {
    ...STYLE.DIALOG_FRAME,
    width: '100%',
  },
});

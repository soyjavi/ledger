import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR, ELEVATION, SPACE } = THEME;
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
  },

  cardLast: {
    marginRight: 0,
  },

  cards: LAYOUT.STYLE.ROW,

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

  dialog: STYLE.DIALOG,

  frame: {
    ...STYLE.DIALOG_FRAME,
    width: '100vw',
  },

  options: {
    ...ELEVATION.LARGE,
    backgroundColor: COLOR.WHITE,
    bottom: 0,
    left: 0,
    paddingTop: SPACE.MEDIUM,
    paddingHorizontal: SPACE.MEDIUM,
    paddingBottom: STYLE.FOOTER_HEIGHT - SPACE.MEDIUM,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: 0,
  },

  title: {
    marginBottom: SPACE.MEDIUM,
  },
});

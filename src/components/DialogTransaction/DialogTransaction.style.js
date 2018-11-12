import { StyleSheet } from 'react-native';

import { C } from 'common';
import { ENV, LAYOUT, THEME } from 'reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { IS_NATIVE } = ENV;
const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingTop: HEADER_HEIGHT,
  },

  buttons: {
    ...LAYOUT.STYLE.ROW,
  },

  dialog: {
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: {
    shadowColor: IS_NATIVE ? 'transparent' : undefined,
    maxHeight: UNIT * 40,
    alignSelf: 'flex-end',
  },

  form: {
    marginVertical: OFFSET,
  },
});

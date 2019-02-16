import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;
const { UNIT } = THEME;
const BAR_SIZE = UNIT * 0.2;

export default StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: -BAR_SIZE,
    height: BAR_SIZE,
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  item: {
    ...LAYOUT.STYLE.ROW,
    marginVertical: UNIT / 2,
  },

  items: {
    width: '100%',
  },

  title: {
    flex: 1,
  },
});

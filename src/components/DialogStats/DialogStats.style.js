import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, DIALOG_FRAME } } = C;
const { COLOR, OFFSET, UNIT } = THEME;
const BAR_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  bar: {
    borderRadius: BAR_SIZE,
    position: 'absolute',
    height: '100%',
  },

  dialog: DIALOG,

  frame: DIALOG_FRAME,

  item: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_SIZE,
    marginVertical: UNIT / 2,
  },

  items: {
    width: '100%',
  },

  texts: {
    ...LAYOUT.STYLE.ROW,
    height: BAR_SIZE,
    paddingHorizontal: OFFSET,
    zIndex: 1,
  },

  title: {
    flex: 1,
    zIndex: 1,
  },
});

import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { ENV, LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { DIALOG } } = C;
const { IS_NATIVE } = ENV;
const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: OFFSET / 4,
  },

  buttons: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: -OFFSET / 4,
    paddingVertical: OFFSET / 4,
  },

  dialog: DIALOG,

  frame: {
    alignSelf: 'flex-end',
    paddingTop: OFFSET,
    maxHeight: IS_NATIVE ? UNIT * 38 : undefined,
  },

  form: {
    marginVertical: OFFSET,
  },

  title: {
    marginBottom: OFFSET / 2,
  },
});

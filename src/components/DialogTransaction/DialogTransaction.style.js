import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { ENV, LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { BANNER } } = C;
const { IS_NATIVE } = ENV;
const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  banner: BANNER,

  button: {
    flex: 1,
    marginHorizontal: OFFSET / 4,
  },

  buttons: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: -OFFSET / 4,
    paddingVertical: OFFSET / 4,
  },

  dialog: {
    justifyContent: 'flex-end',
  },

  frame: {
    alignSelf: 'flex-end',
    paddingTop: OFFSET,
    maxHeight: IS_NATIVE ? UNIT * 52 : undefined,
  },

  form: {
    marginVertical: OFFSET,
  },

  title: {
    marginBottom: OFFSET / 2,
  },
});

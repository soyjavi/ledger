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
    marginTop: OFFSET,
    marginHorizontal: -OFFSET / 4,
  },

  caption: {
    textAlign: 'center',
  },

  dialog: {
    justifyContent: 'flex-end',
  },

  frame: {
    alignSelf: 'flex-end',
    paddingTop: OFFSET,
    maxHeight: IS_NATIVE ? UNIT * 53.6 : undefined,
  },

  transfer: {
    maxHeight: IS_NATIVE ? UNIT * 61.6 : undefined,
  },

  form: {
    marginVertical: OFFSET,
  },

  text: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
  },
});

import { StyleSheet } from 'react-native';

import { ENV, LAYOUT, THEME } from '../../reactor/common';
import { C } from '../../common';

const { STYLE: { BANNER } } = C;
const { IS_NATIVE } = ENV;
const { UNIT, OFFSET } = THEME;

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
    maxHeight: IS_NATIVE ? UNIT * 56.6 : undefined,
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

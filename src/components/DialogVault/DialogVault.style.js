import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { ENV, THEME } from '../../reactor/common';

const { STYLE: { DIALOG, FOOTER } } = C;
const { IS_NATIVE } = ENV;
const { UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  button: {
    flex: 1,
    marginLeft: OFFSET,
  },

  footer: {
    ...FOOTER,
    marginHorizontal: -OFFSET,
  },

  dialog: DIALOG,

  frame: {
    alignSelf: 'flex-end',
    paddingTop: OFFSET,
    maxHeight: IS_NATIVE ? UNIT * 36 : undefined,
  },

  form: {
    marginVertical: OFFSET,
  },

  title: {
    marginBottom: OFFSET / 2,
  },
});

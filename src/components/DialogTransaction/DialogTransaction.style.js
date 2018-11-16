import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { ENV, LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { BANNER } } = C;
const { IS_NATIVE } = ENV;
const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  banner: BANNER,

  button: {
    flex: 1,
    marginHorizontal: OFFSET / 4,
  },

  buttons: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: -OFFSET / 4,
  },

  dialog: {
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
  },

  frame: {
    alignSelf: 'flex-end',
    display: 'flex',
    paddingVertical: OFFSET,
    shadowColor: IS_NATIVE ? 'transparent' : undefined,
  },

  form: {
    marginVertical: OFFSET,
  },

  text: {
    textAlign: 'center',
    alignSelf: 'center',
    width: '90%',
  },
});

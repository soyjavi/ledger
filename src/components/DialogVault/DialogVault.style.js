import { StyleSheet } from 'react-native';

import { ENV, LAYOUT, THEME } from '../../reactor/common';
import { C } from '../../common';

const { STYLE: { BANNER, NOTCH_HEIGHT } } = C;
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
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    justifyContent: 'flex-end',
  },

  frame: {
    alignSelf: 'flex-end',
    display: 'flex',
    paddingBottom: OFFSET,
    paddingTop: OFFSET + NOTCH_HEIGHT,
    shadowColor: IS_NATIVE ? 'transparent' : undefined,
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

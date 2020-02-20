import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE } = C;

const { UNIT, SPACE } = THEME;

export default StyleSheet.create({
  box: {
    marginRight: UNIT,
  },

  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flex: 1,
  },

  buttonGap: {
    width: SPACE.M,
  },

  day: {
    lineHeight: UNIT * 2,
  },

  dialogOverlay: STYLE.DIALOG_OVERLAY,

  dialog: STYLE.DIALOG,

  month: {
    fontSize: UNIT,
    lineHeight: UNIT,
  },

  prices: {
    alignItems: 'flex-end',
  },

  texts: {
    flex: 1,
  },
});

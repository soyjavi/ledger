import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { FONT, SPACE } = THEME;

export default StyleSheet.create({
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
    lineHeight: FONT.BODY.fontSize,
  },

  month: FONT.LEGEND,

  prices: {
    alignItems: 'flex-end',
  },

  texts: {
    flex: 1,
  },
});

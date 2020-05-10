import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { FONT } = THEME;

export default StyleSheet.create({
  boxContent: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },

  day: {
    lineHeight: FONT.BODY.fontSize,
  },

  month: FONT.LEGEND,
});

import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { FONT } = THEME;

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },

  day: {
    lineHeight: FONT.BODY.fontSize,
  },

  legend: FONT.LEGEND,
});

import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  chart: {
    marginHorizontal: SPACE.M,
  },

  charts: {
    backgroundColor: COLOR.CONTRAST,
  },

  chartMargin: {
    marginBottom: SPACE.XL + SPACE.M,
  },
});

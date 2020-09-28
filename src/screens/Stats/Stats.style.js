import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { HEADER_HEIGHT } from '@components';

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

  scrollView: {
    paddingVertical: HEADER_HEIGHT,
  },
});

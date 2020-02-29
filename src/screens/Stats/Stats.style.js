import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';
import { HEADER_HEIGHT } from '../../components';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  chart: {
    marginHorizontal: SPACE.M,
  },

  charts: {
    backgroundColor: COLOR.CONTRAST,
  },

  chartMargin: {
    marginBottom: SPACE.XL + SPACE.XS,
  },

  contentEmpty: {
    padding: SPACE.M,
    alignItems: 'center',
  },

  scrollView: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: SPACE.L,
  },

  sliderMonths: {
    marginTop: HEADER_HEIGHT,
  },
});

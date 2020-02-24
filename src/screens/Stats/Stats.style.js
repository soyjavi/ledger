import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const {
  STYLE: { HEADER_HEIGHT },
} = C;
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

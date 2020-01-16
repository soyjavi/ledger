import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const {
  STYLE: { HEADER_HEIGHT },
} = C;
const { COLOR, SPACE, UNIT } = THEME;

export default StyleSheet.create({
  chart: {
    marginHorizontal: SPACE.MEDIUM,
  },

  charts: {
    backgroundColor: COLOR.CONTRAST,
  },

  chartMargin: {
    marginBottom: SPACE.XL,
  },

  chartBalance: {
    height: UNIT * 9.6,
  },

  contentEmpty: {
    padding: SPACE.MEDIUM,
    alignItems: 'center',
  },

  scrollView: {
    paddingBottom: HEADER_HEIGHT,
  },

  sliderMonths: {
    marginTop: HEADER_HEIGHT,
    paddingBottom: SPACE.S,
  },
});

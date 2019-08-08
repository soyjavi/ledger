import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  chart: {
    marginHorizontal: SPACE.MEDIUM,
  },

  chartMargin: {
    marginBottom: SPACE.REGULAR,
  },

  chartBalance: {
    height: 128,
  },

  container: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },

  contentEmpty: {
    padding: SPACE.MEDIUM,
    alignItems: 'center',
  },

  sliderMonths: {
    marginBottom: SPACE.S,
  },
});

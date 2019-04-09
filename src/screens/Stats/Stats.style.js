import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { COLOR, SPACE } = THEME;

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

  content: {
    backgroundColor: COLOR.WHITE,
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
    marginBottom: SPACE.MEDIUM,
  },
});

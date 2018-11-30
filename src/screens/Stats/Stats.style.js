import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT, NOTCH_HEIGHT, SLIDER_MONTHS_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    marginBottom: OFFSET,
  },

  row: LAYOUT.STYLE.ROW,

  scroll: {
    paddingBottom: HEADER_HEIGHT,
    paddingHorizontal: OFFSET,
    paddingTop: HEADER_HEIGHT + SLIDER_MONTHS_HEIGHT + NOTCH_HEIGHT,
  },

  subtitle: {
    flex: 1,
    marginBottom: OFFSET / 3,
    marginTop: OFFSET / 2,
  },
});

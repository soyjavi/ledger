import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    marginBottom: OFFSET,
  },

  row: LAYOUT.STYLE.ROW,

  scroll: {
    paddingBottom: HEADER_HEIGHT,
    paddingHorizontal: OFFSET,
    paddingTop: HEADER_HEIGHT,
  },

  subtitle: {
    flex: 1,
    marginBottom: OFFSET / 3,
    marginTop: OFFSET / 2,
  },
});

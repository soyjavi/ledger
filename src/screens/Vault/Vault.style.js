import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const {
  STYLE: { HEADER_HEIGHT, HEADER_EXTENDED_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    ...LAYOUT.STYLE.CENTERED,
    padding: OFFSET,
  },

  scroll: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_EXTENDED_HEIGHT,
  },
});

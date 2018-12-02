import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const {
  STYLE: {
    BANNER, HEADER_HEIGHT, NOTCH_HEIGHT,
  },
} = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  banner: BANNER,

  content: {
    ...LAYOUT.STYLE.CENTERED,
    padding: OFFSET,
  },

  scroll: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT + NOTCH_HEIGHT,
  },
});

import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT, NOTCH_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    marginBottom: OFFSET,
  },

  scroll: {
    paddingTop: HEADER_HEIGHT + NOTCH_HEIGHT,
    paddingBottom: HEADER_HEIGHT,
    paddingHorizontal: OFFSET,
  },

  title: {
    // marginBottom: OFFSET / 2,
  },

  subtitle: {
    marginTop: OFFSET / 2,
    marginBottom: OFFSET / 3,
  },
});

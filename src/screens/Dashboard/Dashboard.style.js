import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingBottom: HEADER_HEIGHT,
  },

  slider: {
    padding: OFFSET / 2,
  },
});

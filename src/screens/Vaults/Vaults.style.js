import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { HEADER_HEIGHT } from '@components';

const { SPACE } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  slider: {
    marginBottom: SPACE.L,
    paddingLeft: SPACE.S,
    paddingRight: SPACE.M,
  },
});

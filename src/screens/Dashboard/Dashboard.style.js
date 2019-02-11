import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { OFFSET } = THEME;

const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  scroll: {
    paddingBottom: HEADER_HEIGHT,
  },

  slider: {
    padding: OFFSET / 2,
  },
});

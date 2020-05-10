import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { HEADER_HEIGHT } from '@components';

const { SPACE } = THEME;

export default StyleSheet.create({
  smallButton: {
    paddingHorizontal: 0,
  },

  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  vaults: {
    marginBottom: SPACE.M,
  },
});

import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  summary: {
    marginBottom: SPACE.REGULAR,
  },

  vaults: {
    marginTop: SPACE.S,
  },
});

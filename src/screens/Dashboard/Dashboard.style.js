import { StyleSheet } from 'react-native';

import { HEADER_HEIGHT } from '../../components';
import { THEME } from '../../reactor/common';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  buttonHeader: {
    height: SPACE.L,
    paddingHorizontal: 0,
    backgroundColor: COLOR.BACKGROUND,
  },

  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  vaults: {
    marginBottom: SPACE.L,
    paddingLeft: SPACE.S,
    paddingRight: SPACE.M,
  },
});

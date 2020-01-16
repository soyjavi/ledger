import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const {
  STYLE: { HEADER_HEIGHT },
} = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  headingVaults: {
    marginRight: SPACE.S,
  },

  icon: {
    height: SPACE.L,
    width: SPACE.L,
  },

  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  vaults: {
    marginBottom: SPACE.L,
    paddingLeft: SPACE.XXS,
    paddingRight: SPACE.MEDIUM,
  },
});

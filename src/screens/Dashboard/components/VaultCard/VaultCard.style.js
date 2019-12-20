import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { LAYOUT, THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  balance: {
    marginTop: SPACE.XXS,
  },

  container: {
    height: STYLE.VAULT_ITEM_WIDTH * 0.85,
    marginBottom: SPACE.S,
    marginLeft: SPACE.S,
    width: STYLE.VAULT_ITEM_WIDTH,
  },

  content: {
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  expand: {
    flex: 1,
  },

  thumbnail: {
    height: SPACE.MEDIUM,
    // marginBottom: SPACE.XXS,
    marginRight: SPACE.XXS,
    width: SPACE.MEDIUM,
  },
});

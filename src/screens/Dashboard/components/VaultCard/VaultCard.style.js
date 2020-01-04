import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { LAYOUT, THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    height: UNIT * 12.8,
    marginLeft: SPACE.S,
    width: STYLE.VAULT_ITEM_WIDTH,
  },

  content: {
    flex: 1,
  },

  balance: {
    opacity: 0.68,
  },

  row: LAYOUT.STYLE.ROW,

  expand: {
    flex: 1,
  },

  thumbnail: {
    height: SPACE.MEDIUM,
    marginRight: SPACE.XXS,
    width: SPACE.MEDIUM,
  },
});

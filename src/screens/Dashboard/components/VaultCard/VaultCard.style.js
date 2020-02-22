import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { SPACE } = THEME;

const SIZE = SPACE.XL * 4;

export default StyleSheet.create({
  box: {
    alignItems: 'flex-start',
  },

  container: {
    height: SIZE,
    width: STYLE.VAULT_ITEM_WIDTH,
  },

  content: {
    flex: 1,
  },

  balance: {
    opacity: 0.68,
  },

  expand: {
    flex: 1,
  },

  thumbnail: {
    height: SPACE.M,
    width: SPACE.M,
  },
});

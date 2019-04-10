import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, UNIT, SPACE } = THEME;
const THUMBNAIL_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    height: STYLE.VAULT_ITEM_WIDTH * 1.3,
    marginBottom: SPACE.MEDIUM,
    marginLeft: SPACE.S,
    width: STYLE.VAULT_ITEM_WIDTH,
  },

  content: {
    flex: 1,
    // alignItems: 'center',
  },

  row: LAYOUT.STYLE.ROW,

  separator: {
    flex: 1,
  },

  thumbnail: {
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    width: THUMBNAIL_SIZE,
    backgroundColor: COLOR.WHITE,
    marginBottom: SPACE.XXS,
  },
});

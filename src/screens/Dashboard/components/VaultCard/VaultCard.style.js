import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { LAYOUT, THEME } from '../../../../reactor/common';

const { STYLE } = C;
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    height: STYLE.VAULT_ITEM_WIDTH * 0.85,
    marginBottom: SPACE.S,
    marginLeft: SPACE.S,
    width: STYLE.VAULT_ITEM_WIDTH,
  },

  containerGradient: {
    // ...STYLE.CARD,
    // backgroundColor: COLOR.BASE,
    // borderRadius: BORDER_RADIUS,
    // height: '100%',
    // width: '100%',
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
    marginBottom: SPACE.XXS,
    marginRight: SPACE.XXS,
    width: SPACE.MEDIUM,
  },
});

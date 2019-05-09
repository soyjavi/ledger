import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, SPACE } = THEME;
const ITEM_HEIGHT = SPACE.XL;
const ITEM_WIDTH = LAYOUT.VIEWPORT.W / 3;

export { ITEM_WIDTH };

export default StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    width: LAYOUT.VIEWPORT.W,
  },

  item: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    justifyContent: 'center',
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
});

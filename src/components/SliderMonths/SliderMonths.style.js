import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  BORDER_RADIUS, COLOR, UNIT,
} = THEME;
const ITEM_HEIGHT = UNIT * 4.8;
const ITEM_HEIGHT_ACTIVE = UNIT * 6.4;
const ITEM_WIDTH = LAYOUT.VIEWPORT.W / 7;

export { ITEM_WIDTH };

export default StyleSheet.create({
  slider: {
    alignItems: 'center',
  },

  item: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLOR.BASE,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    width: ITEM_WIDTH,
  },

  itemSelected: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: BORDER_RADIUS,
    height: ITEM_HEIGHT_ACTIVE,
  },

  year: {
    opacity: 0.66,
  },
});

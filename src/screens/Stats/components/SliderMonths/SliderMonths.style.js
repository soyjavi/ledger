import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const {
  BORDER_RADIUS, COLOR, UNIT, SPACE,
} = THEME;
const ITEM_SIZE = UNIT * 6;
const ITEM_WIDTH = ITEM_SIZE + (SPACE.XXS * 2);

export { ITEM_WIDTH };

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.CONTRAST,
  },

  item: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: ITEM_SIZE,
    justifyContent: 'center',
    marginBottom: SPACE.XS,
    marginHorizontal: SPACE.XXS,
    width: ITEM_SIZE,
  },

  itemSelected: {
    backgroundColor: COLOR.PRIMARY,
  },

  year: {
    opacity: 0.66,
  },
});

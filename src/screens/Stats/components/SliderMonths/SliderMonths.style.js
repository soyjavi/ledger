import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { UNIT, SPACE } = THEME;
const ITEM_SIZE = UNIT * 8;
const ITEM_WIDTH = ITEM_SIZE + SPACE.XS * 2;

export { ITEM_WIDTH };

export default StyleSheet.create({
  card: {
    width: ITEM_SIZE,
  },
});

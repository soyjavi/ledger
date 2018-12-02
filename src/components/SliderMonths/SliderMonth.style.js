import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT, NOTCH_HEIGHT, SLIDER_MONTHS_HEIGHT } } = C;
const { COLOR, UNIT, OFFSET } = THEME;
const ITEM_WIDTH = (LAYOUT.VIEWPORT.W - (OFFSET * 2)) / 3;

export {
  ITEM_WIDTH,
};

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
    height: SLIDER_MONTHS_HEIGHT,
    position: 'absolute',
    top: HEADER_HEIGHT + NOTCH_HEIGHT - UNIT,
    left: OFFSET,
    right: OFFSET,
    // width: '100%',
    zIndex: 1,
  },

  item: {
    lineHeight: SLIDER_MONTHS_HEIGHT,
    textAlign: 'center',
    width: ITEM_WIDTH,
  },
});

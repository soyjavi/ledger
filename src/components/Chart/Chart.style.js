import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, UNIT, SPACE } = THEME;

const ITEM_DETAILED_SIZE = UNIT * 2.2;

export default StyleSheet.create({
  caption: {
    textAlign: 'center',
    height: ITEM_DETAILED_SIZE,
    width: ITEM_DETAILED_SIZE,
    overflow: 'hidden',
  },

  captions: {
    ...LAYOUT.STYLE.ROW,
    marginTop: SPACE.XXS,
    justifyContent: 'space-between',
  },

  container: {
    alignItems: 'flex-end',
    height: UNIT * 4.8,
  },

  detailed: {
    height: UNIT * 9.6,
  },

  item: {
    borderRadius: BORDER_RADIUS / 2,
    height: '100%',
    minHeight: UNIT * 0.7,
    width: UNIT * 0.7,
  },

  itemDetailed: {
    borderRadius: BORDER_RADIUS,
    minHeight: ITEM_DETAILED_SIZE,
    width: ITEM_DETAILED_SIZE,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    flex: 1,
    justifyContent: 'space-between',
  },
});

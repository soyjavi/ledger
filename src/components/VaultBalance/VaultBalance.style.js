import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET } = THEME;

const { STYLE: { HEADER_HEIGHT, HEADER_EXTENDED_HEIGHT } } = C;

export default StyleSheet.create({
  bulletPrice: {
    marginRight: OFFSET / 2,
  },

  cashflow: {
    marginTop: OFFSET / 2,
  },

  container: {
    alignItems: 'flex-end',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: HEADER_EXTENDED_HEIGHT,
    left: 0,
    position: 'absolute',
    paddingTop: HEADER_HEIGHT,
    paddingHorizontal: OFFSET,
    right: 0,
    top: 0,
    zIndex: 1,
  },

  info: {
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,
});

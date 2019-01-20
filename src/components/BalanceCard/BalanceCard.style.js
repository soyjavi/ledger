import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, OFFSET } = THEME;

const { STYLE: { BALANCE_CARD_HEIGHT } } = C;

export default StyleSheet.create({
  background: {
    position: 'absolute',
    opacity: 0.1,
  },

  bulletPrice: {
    marginRight: OFFSET / 2,
  },

  container: {
    ...LAYOUT.STYLE.SHADOW,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    borderRadius: BORDER_RADIUS,
    height: BALANCE_CARD_HEIGHT,
    padding: OFFSET,
    margin: OFFSET,
    zIndex: 1,
  },

  info: {
    alignItems: 'flex-end',
    flex: 1,
  },

  lastBalance: {
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  caption: {
    opacity: 0.8,
  },

  text: {
    color: COLOR.WHITE,
  },
});

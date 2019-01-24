import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, OFFSET } = THEME;

const { STYLE: { BALANCE_CARD_HEIGHT } } = C;

export default StyleSheet.create({
  background: {
    position: 'absolute',
    opacity: 0.1,
    top: OFFSET,
    left: OFFSET,
  },

  bulletPrice: {
    top: OFFSET / 4,
    marginRight: OFFSET / 2,
  },

  caption: {
    opacity: 0.8,
  },

  ruler: {
    flex: 1,
    textAlign: 'right',
    opacity: 0.4,
  },

  container: {
    ...LAYOUT.STYLE.SHADOW,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    borderRadius: BORDER_RADIUS,
    height: BALANCE_CARD_HEIGHT,
    overflow: 'hidden',
    padding: OFFSET,
    marginVertical: OFFSET,
    marginHorizontal: OFFSET,
    zIndex: 1,
  },

  info: {
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },

  row: LAYOUT.STYLE.ROW,

  summary: {
    justifyContent: 'space-between',
    marginBottom: OFFSET / 4,
  },

  text: {
    color: COLOR.WHITE,
  },
});

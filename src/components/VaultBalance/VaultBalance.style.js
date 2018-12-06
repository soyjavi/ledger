import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET } = THEME;

const { STYLE: { HEADER_HEIGHT, VAULT_HEIGHT } } = C;

export default StyleSheet.create({
  bulletPrice: {
    marginRight: OFFSET / 2,
  },

  cashflow: {
    flex: 1,
    alignSelf: 'flex-end',
  },

  container: {
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    paddingHorizontal: OFFSET,
    height: VAULT_HEIGHT,
    zIndex: 1,
  },

  content: {
    width: '100%',
  },

  row: LAYOUT.STYLE.ROW,
});

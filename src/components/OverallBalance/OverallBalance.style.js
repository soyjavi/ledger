import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_EXTENDED_HEIGHT } } = C;
const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  bulletPrice: {
    marginRight: OFFSET / 2,
  },

  container: {
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: HEADER_EXTENDED_HEIGHT,
    paddingHorizontal: OFFSET * 2,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },

  month: {
    marginTop: OFFSET / 2,
    marginBottom: OFFSET / 4,
  },

  row: LAYOUT.STYLE.ROW,
});

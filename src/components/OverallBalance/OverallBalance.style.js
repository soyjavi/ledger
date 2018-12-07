import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_EXTENDED_HEIGHT } } = C;
const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = OFFSET * 2 + UNIT;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: HEADER_EXTENDED_HEIGHT,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    marginTop: OFFSET,
  },

  context: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: UNIT,
  },

  image: {
    ...LAYOUT.STYLE.CENTERED,
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    backgroundColor: COLOR.BASE,
    borderRadius: BULLET_SIZE / 2,
    marginRight: UNIT,
  },
});

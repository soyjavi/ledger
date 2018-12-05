import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = OFFSET * 2 + UNIT;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    paddingVertical: OFFSET,
    position: 'absolute',
    top: UNIT / 2,
    width: '100%',
    zIndex: 1,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    padding: OFFSET,
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

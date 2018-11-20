import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { NOTCH_HEIGHT } } = C;
const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = OFFSET * 2 + UNIT;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    paddingVertical: OFFSET,
    position: 'absolute',
    top: NOTCH_HEIGHT,
    width: '100%',
    zIndex: 1,
  },

  title: {
    marginBottom: OFFSET / 2,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    padding: OFFSET,
  },

  context: {
    ...LAYOUT.STYLE.ROW,
    flex: 1,
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

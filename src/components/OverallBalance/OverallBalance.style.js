import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from 'reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = OFFSET * 2 + UNIT;

export default StyleSheet.create({
  arrow: {
    alignSelf: 'center',
    color: COLOR.WHITE,
    marginTop: BULLET_SIZE / 6,
  },

  arrowIncomes: {
    transform: [{ rotate: '180deg' }],
  },

  container: {
    alignItems: 'center',
    paddingVertical: OFFSET,
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
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    backgroundColor: COLOR.BASE,
    borderRadius: BULLET_SIZE / 2,
    marginRight: UNIT,
  },
});

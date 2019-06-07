import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, SPACE, UNIT } = THEME;
const BAR_SIZE = UNIT;
const BAR_SIZE_SMALL = UNIT / 2;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_SIZE / 2,
    height: BAR_SIZE,
    minWidth: BAR_SIZE,
  },

  barContainer: {
    marginVertical: SPACE.XXS,
  },

  barSmall: {
    borderRadius: BAR_SIZE_SMALL / 2,
    height: BAR_SIZE_SMALL,
    minWidth: BAR_SIZE_SMALL,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    justifyContent: 'space-between',
  },
});

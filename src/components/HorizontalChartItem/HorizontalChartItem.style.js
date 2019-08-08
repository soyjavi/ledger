import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, SPACE, UNIT } = THEME;
const BAR_SIZE = UNIT;
const BAR_SIZE_SMALL = UNIT / 2;
const IMAGE_SIZE = SPACE.MEDIUM;

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

  image: {
    height: IMAGE_SIZE,
    marginBottom: SPACE.XXS / 2,
    marginRight: SPACE.XXS,
    width: IMAGE_SIZE,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
  },

  text: {
    flex: 1,
  },
});

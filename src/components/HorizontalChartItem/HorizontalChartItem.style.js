import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, SPACE, UNIT } = THEME;
const BAR_SIZE = UNIT + UNIT / 4;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: BAR_SIZE,
    minWidth: BAR_SIZE,
  },

  barContainer: {
    marginVertical: SPACE.XS,
  },

  barSmall: {
    height: BAR_SIZE / 2,
    minWidth: BAR_SIZE / 2,
  },

  text: {
    flex: 1,
  },
});

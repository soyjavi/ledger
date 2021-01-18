import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BAR_SIZE, BORDER_RADIUS, COLOR, SPACE } = THEME;

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
    height: BAR_SIZE / 4,
    minWidth: BAR_SIZE / 4,
  },

  text: {
    flex: 1,
  },
});

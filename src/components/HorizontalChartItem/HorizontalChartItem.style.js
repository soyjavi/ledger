import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;
const BAR_HEIGHT = SPACE.S + SPACE.XS / 2;

const RADIUS = BORDER_RADIUS / 2;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: RADIUS,
    height: BAR_HEIGHT,
    minWidth: BAR_HEIGHT,
  },

  barContainer: {
    marginVertical: SPACE.XS,
  },

  barSmall: {
    height: BAR_HEIGHT / 4,
    minWidth: BAR_HEIGHT / 4,
  },

  text: {
    flex: 1,
  },
});

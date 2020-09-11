import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, SPACE } = THEME;
const BAR_HEIGHT = SPACE.S + SPACE.XS / 2;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
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

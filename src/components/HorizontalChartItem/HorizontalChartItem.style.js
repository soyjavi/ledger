import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BAR_SIZE, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_SIZE / 2,
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

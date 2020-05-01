import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { SPACE } = THEME;

export const CURRENCYCARD_WIDTH = LAYOUT.VIEWPORT.W / 2 - SPACE.XL;

export default StyleSheet.create({
  box: {
    alignItems: 'flex-start',
  },

  container: {
    height: CURRENCYCARD_WIDTH * 0.68,
    width: CURRENCYCARD_WIDTH,
  },

  content: {
    flex: 1,
  },

  expand: {
    flex: 1,
  },

  flag: {
    height: SPACE.M,
    width: SPACE.M,
  },
});

import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { SPACE } = THEME;

let VAULTCARD_WIDTH = LAYOUT.VIEWPORT.W / 2 - (SPACE.L + SPACE.XS);
if (VAULTCARD_WIDTH > 196) VAULTCARD_WIDTH = 196;

export { VAULTCARD_WIDTH };

export default StyleSheet.create({
  box: {
    alignItems: 'flex-start',
  },

  container: {
    height: VAULTCARD_WIDTH * 0.68,
    width: VAULTCARD_WIDTH,
  },

  content: {
    flex: 1,
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.S + SPACE.XS,
  },

  expand: {
    flex: 1,
  },

  flag: {
    height: SPACE.M,
    width: SPACE.M,
  },

  title: {
    fontFamily: 'font-family-headline',
    fontWeight: '400',
    fontSize: 16,
  },
});

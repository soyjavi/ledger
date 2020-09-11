import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { SPACE } = THEME;

let CARD_WIDTH = LAYOUT.VIEWPORT.W / 2 - (SPACE.L + SPACE.XS);
if (CARD_WIDTH > 196) CARD_WIDTH = 196;

export { CARD_WIDTH };

export default StyleSheet.create({
  box: {
    alignItems: 'flex-start',
  },

  container: {
    height: CARD_WIDTH * 0.68,
    width: CARD_WIDTH,
  },

  content: {
    flex: 1,
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.S + SPACE.XS,
    alignItems: 'flex-start',
  },

  expand: {
    flex: 1,
  },

  image: {
    height: SPACE.M,
    width: SPACE.M,
  },
});

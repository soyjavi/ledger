import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { SPACE } = THEME;

let CARD_SIZE = LAYOUT.VIEWPORT.W / 2 - SPACE.XL * 2;
if (CARD_SIZE > 144) CARD_SIZE = 144;

export { CARD_SIZE };

export default StyleSheet.create({
  box: {
    alignItems: 'flex-start',
  },

  container: {
    height: CARD_SIZE,
    width: CARD_SIZE * 1.3,
  },

  content: {
    flex: 1,
    padding: SPACE.M,
    alignItems: 'flex-start',
  },

  breakline: {
    flex: 1,
  },
});

import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const {
  VIEWPORT: { H, W },
} = LAYOUT;
const { SPACE } = THEME;
const MAP_HEIGHT = Math.floor(H / 4);
const MAP_WIDTH = Math.floor(W - SPACE.MEDIUM * 2);

export { MAP_HEIGHT, MAP_WIDTH };

export default StyleSheet.create({
  container: {
    marginHorizontal: SPACE.MEDIUM,
  },

  content: {
    marginBottom: SPACE.MEDIUM,
  },

  heading: {
    marginHorizontal: 0,
  },
});

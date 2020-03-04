import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  VIEWPORT: { H, W },
} = LAYOUT;
const { COLOR, BORDER_RADIUS, SPACE } = THEME;
const MAP_HEIGHT = Math.floor(H / 5);
const MAP_WIDTH = Math.floor(W - SPACE.L * 2);

export { MAP_HEIGHT, MAP_WIDTH };

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: MAP_HEIGHT,
    width: MAP_WIDTH,
  },
});

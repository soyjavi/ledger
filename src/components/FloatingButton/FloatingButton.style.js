import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from 'reactor/common';

const {
  COLOR, FONT, UNIT, OFFSET,
} = THEME;
const CONTAINER_SIZE = UNIT * 5.6;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: OFFSET,
    right: OFFSET,
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    zIndex: 1,
  },

  button: {
    ...LAYOUT.STYLE.SHADOW,
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderRadius: CONTAINER_SIZE / 2,
    backgroundColor: COLOR.TEXT,
    alignItems: 'center',
  },

  text: {
    color: COLOR.WHITE,
    fontSize: UNIT * 2.8,
    fontWeight: FONT.WEIGHT.BOLD,
    lineHeight: CONTAINER_SIZE * 0.95,
  },
});

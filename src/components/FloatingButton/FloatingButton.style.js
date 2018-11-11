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

  bullet: {
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT / 2,
    backgroundColor: COLOR.BASE,
    marginLeft: UNIT,
  },

  button: {
    ...LAYOUT.STYLE.SHADOW,
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderRadius: CONTAINER_SIZE / 2,
    backgroundColor: COLOR.TEXT,
    alignItems: 'center',
  },

  motionButton: {
    zIndex: 1,
  },

  opened: {
    transform: [{ rotate: '45deg' }],
  },

  options: {
    position: 'absolute',
    top: -(CONTAINER_SIZE + (OFFSET * 1.5)),
    right: (CONTAINER_SIZE / 4),
    alignItems: 'flex-end',
  },

  option: {
    ...LAYOUT.STYLE.SHADOW,
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    paddingVertical: UNIT / 2,
    paddingHorizontal: UNIT,
    borderRadius: UNIT * 2,
    marginVertical: OFFSET / 2,
  },

  text: {
    color: COLOR.WHITE,
    fontSize: UNIT * 2.8,
    fontWeight: FONT.WEIGHT.BOLD,
    lineHeight: CONTAINER_SIZE * 0.95,
  },
});

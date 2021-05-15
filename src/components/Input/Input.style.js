import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const CONTAINER_HEIGHT = SPACE.XXL + SPACE.L;

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLOR.BASE_LIGHTEN,
    borderColor: COLOR.TRANSPARENT,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    height: CONTAINER_HEIGHT,
    minHeight: CONTAINER_HEIGHT,
  },

  active: {
    borderColor: COLOR.TEXT,
  },

  fulfilled: {
    backgroundColor: COLOR.TRANSPARENT,
  },

  input: {
    ...FONT.BOLD,
    ...FONT.INPUT,
    color: COLOR.TEXT,
    height: '100%',
    paddingHorizontal: SPACE.M,
    paddingTop: SPACE.M + (SPACE.XS - SPACE.XS / 2),
    margin: 0,
    width: '100%',
  },

  label: {
    position: 'absolute',
    top: SPACE.M,
    left: SPACE.M,
  },
});

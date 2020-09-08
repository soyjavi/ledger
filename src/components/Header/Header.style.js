import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

const ENV = useEnvironment();
const { BORDER_RADIUS, ELEVATION, UNIT, COLOR, SPACE } = THEME;
const IMAGE_SIZE = SPACE.M + SPACE.XS;

export const HEADER_HEIGHT = UNIT * 8;

export default StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    justifyContent: 'space-between',
    top: 0,
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    // backgroundColor: COLOR.BACKGROUND,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },

  content: {
    flex: 1,
    minWidth: '60%',
  },

  image: {
    borderRadius: BORDER_RADIUS / 2,
    marginRight: SPACE.S,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },

  // elevate: ELEVATION,
});

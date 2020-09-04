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
  },

  content: {
    flex: 1,
    minWidth: '60%',
  },

  image: {
    alignSelf: 'center',
    borderRadius: BORDER_RADIUS / 2,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },

  solid: {
    backgroundColor: COLOR.BACKGROUND,
    ...ELEVATION,
  },
});

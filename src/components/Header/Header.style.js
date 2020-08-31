import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

const ENV = useEnvironment();
const { ELEVATION, UNIT, COLOR } = THEME;

export const HEADER_HEIGHT = UNIT * 8;

export default StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    justifyContent: 'space-between',
    top: 0,
    width: '100%',
    zIndex: 2,
  },

  content: {
    flex: 1,
    minWidth: '60%',
  },

  solid: {
    backgroundColor: COLOR.BACKGROUND,
    ...ELEVATION,
  },
});

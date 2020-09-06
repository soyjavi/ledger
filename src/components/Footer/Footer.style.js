import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

const ENV = useEnvironment();
const { BORDER_RADIUS, ELEVATION, UNIT, COLOR, SPACE } = THEME;

export const HEADER_HEIGHT = UNIT * 8;

export default StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    bottom: SPACE.M,
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.S + SPACE.XS,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    left: SPACE.M,
    right: SPACE.M,
    width: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: COLOR.CTA,
    ...ELEVATION,
  },
});

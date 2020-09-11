import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

const ENV = useEnvironment();
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  status: {
    alignSelf: 'center',
    top: SPACE.M + SPACE.XS,
    top: 0,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    backgroundColor: COLOR.TEXT,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS,
    borderRadius: BORDER_RADIUS,
    zIndex: 2,
  },
});

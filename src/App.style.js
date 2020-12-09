import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  connected: {
    alignSelf: 'center',
    backgroundColor: COLOR.ERROR,
    borderRadius: BORDER_RADIUS,
    right: SPACE.M,
    top: SPACE.S + SPACE.XS,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    zIndex: 2,
  },
});

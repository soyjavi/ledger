import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

const ENV = useEnvironment();
const { BORDER_RADIUS, COLOR, SNACKBAR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  snackbar: SNACKBAR,

  status: {
    bottom: SPACE.M,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    left: SPACE.M,
    backgroundColor: COLOR.TEXT,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS,
    borderRadius: BORDER_RADIUS,
    zIndex: 2,
  },
});

import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { ELEVATION, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    minHeight: SPACE.XL + SPACE.XS,
    minWidth: SPACE.XL + SPACE.XS,
    zIndex: 1,
    justifyContent: 'center',
  },

  elevation: ELEVATION,
});

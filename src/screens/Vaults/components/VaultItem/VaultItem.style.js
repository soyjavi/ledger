import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { OPACITY, SPACE } = THEME;

export default StyleSheet.create({
  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.S,
    flex: 1,
  },

  disabled: {
    opacity: OPACITY.M,
  },

  flag: {
    height: SPACE.M,
    width: SPACE.M,
  },
});

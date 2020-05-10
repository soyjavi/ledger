import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginBottom: SPACE.L,
  },

  content: {
    paddingHorizontal: SPACE.M,
  },

  expand: {
    marginBottom: SPACE.XS,
  },
});

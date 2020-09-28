import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
  },

  flag: {
    height: SPACE.M,
    width: SPACE.M,
  },
});

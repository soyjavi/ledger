import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    paddingHorizontal: SPACE.M,
  },

  input: {
    height: SPACE.XXL * 2,
  },
});

import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    paddingHorizontal: SPACE.L,
    paddingVertical: SPACE.XL,
    justifyContent: 'flex-end',
  },

  form: {
    alignItems: 'center',
  },

  buttonRight: {
    marginLeft: 'auto',
  },
});

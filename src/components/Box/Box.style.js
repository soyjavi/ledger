import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    minHeight: SPACE.XL + SPACE.S,
    minWidth: SPACE.XL + SPACE.S,
    justifyContent: 'center',
    zIndex: 1,
  },

  date: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

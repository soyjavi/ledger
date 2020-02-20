import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACE.M,
    bottom: SPACE.M,
    zIndex: 1,
  },

  button: {
    backgroundColor: COLOR.ACCENT,
  },
});

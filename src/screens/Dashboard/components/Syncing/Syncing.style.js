import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACE.MEDIUM,
    bottom: SPACE.REGULAR,
    zIndex: 1,
  },

  button: {
    backgroundColor: COLOR.ACCENT,
  },
});

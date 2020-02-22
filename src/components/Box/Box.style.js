import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    minHeight: SPACE.XL + SPACE.XS,
    minWidth: SPACE.XL + SPACE.XS,
  },

  content: {
    justifyContent: 'center',
    width: '100%',
    zIndex: 1,
  },

  frame: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0,
  },

  small: {
    padding: 0,
  },
});

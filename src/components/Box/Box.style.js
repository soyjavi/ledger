import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    height: '100%',
    minHeight: SPACE.XL,
    minWidth: SPACE.XL,
  },

  content: {
    flex: 1,
    padding: SPACE.M,
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

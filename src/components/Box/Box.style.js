import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'hidden',
    padding: SPACE.MEDIUM,
  },

  content: {
    height: '100%',
    zIndex: 1,
  },

  frame: {
    borderRadius: BORDER_RADIUS,
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

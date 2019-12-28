import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { SPACE, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    height: '100%',
    minHeight: UNIT * 3.6,
    minWidth: UNIT * 3.6,
  },

  content: {
    flex: 1,
    padding: SPACE.MEDIUM,
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

import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { OFFSET } = THEME;

const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  button: {
    position: 'absolute',
    top: OFFSET / 2,
    zIndex: 2,
  },

  buttonIcon: {
    width: 40,
    height: 40,
  },

  left: {
    left: 0,
  },

  right: {
    right: 0,
  },

  scroll: {
    paddingTop: OFFSET,
    paddingBottom: HEADER_HEIGHT,
  },

  subtitle: {
    marginTop: OFFSET,
    marginHorizontal: OFFSET,
  },
});

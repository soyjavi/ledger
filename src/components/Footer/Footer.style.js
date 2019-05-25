import { StyleSheet } from 'react-native';

import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  button: {
    marginLeft: SPACE.S,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    bottom: SPACE.MEDIUM,
    justifyContent: 'flex-end',
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: SPACE.MEDIUM,
    zIndex: 2,
  },
});

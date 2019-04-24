import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { SPACE, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    position: 'absolute',
    left: SPACE.MEDIUM,
    top: SPACE.REGULAR,
    zIndex: 2,
  },

  icon: {
    opacity: 0.75,
    marginRight: SPACE.XXS,
    marginBottom: SPACE.XXS / 2,
    height: UNIT * 1.6,
    width: UNIT * 1.6,
  },
});

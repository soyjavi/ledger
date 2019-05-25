import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACE.MEDIUM,
    bottom: SPACE.REGULAR + SPACE.XS,
    zIndex: 2,
  },
});

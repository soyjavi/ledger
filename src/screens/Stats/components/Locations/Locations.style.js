import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { BORDER_RADIUS, UNIT, SPACE } = THEME;

export default StyleSheet.create({
  container: {

  },

  content: {
    margin: SPACE.MEDIUM,
  },

  map: {
    borderRadius: BORDER_RADIUS,
    height: UNIT * 19.2,
    width: '100%',
  },
});

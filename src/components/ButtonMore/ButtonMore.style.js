import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;
const ICON_SIZE = UNIT * 1.8;

export default StyleSheet.create({
  container: {
    marginRight: -SPACE.XS,
  },

  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginRight: -SPACE.XS,
  },
});

import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { FONT: { FAMILY_BOLD }, UNIT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
  },

  font: {
    fontFamily: FAMILY_BOLD,
  },

  icon: {
    height: UNIT,
    width: UNIT,
    marginRight: SPACE.XXS,
  },
});

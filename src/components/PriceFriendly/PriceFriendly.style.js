import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const {
  FONT: { FAMILY_BOLD },
  UNIT,
  SPACE,
} = THEME;

export default StyleSheet.create({
  font: {
    fontFamily: FAMILY_BOLD,
  },

  icon: {
    height: UNIT,
    width: UNIT,
    marginRight: SPACE.XXS,
  },
});

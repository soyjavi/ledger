import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
  },

  icon: {
    height: UNIT,
    width: UNIT,
    marginRight: SPACE.XXS,
  },
});

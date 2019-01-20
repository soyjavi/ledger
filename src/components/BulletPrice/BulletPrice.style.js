import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  container: LAYOUT.STYLE.ROW,

  icon: {
    height: OFFSET,
    width: OFFSET,
    // marginRight: OFFSET / 4,
  },
});

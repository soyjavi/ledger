import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { OFFSET } = THEME;

export default StyleSheet.create({
  heading: {
    ...LAYOUT.STYLE.ROW,
    flex: 1,
    justifyContent: 'flex-end',
  },

  icon: {
    marginRight: -OFFSET / 2,
  },
});

import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  headingValues: {
    ...LAYOUT.STYLE.ROW,
    flex: 1,
    justifyContent: 'flex-end',
  },

  icon: {
    marginLeft: SPACE.S,
    marginRight: -SPACE.XS,
  },
});

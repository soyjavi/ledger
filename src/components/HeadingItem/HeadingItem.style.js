import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  breakline: {
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    paddingVertical: SPACE.XS,
    marginLeft: SPACE.MEDIUM,
    marginRight: SPACE.MEDIUM,
  },
});

import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
    paddingHorizontal: SPACE.MEDIUM,
    paddingTop: SPACE.MEDIUM,
    paddingBottom: SPACE.XS,
  },
});

import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
    marginLeft: OFFSET,
    paddingLeft: OFFSET / 2,
    paddingRight: OFFSET,
    paddingVertical: OFFSET / 2,
  },
});

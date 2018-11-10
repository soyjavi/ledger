import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from 'reactor/common';

const { COLOR, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    height: UNIT * 4,
    width: UNIT * 12.8,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  bar: {
    backgroundColor: COLOR.BASE,
    flex: 1,
    marginHorizontal: UNIT * 0.1,
    height: '100%',
    borderRadius: UNIT / 4,
  },
});

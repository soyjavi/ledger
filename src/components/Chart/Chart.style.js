import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    height: UNIT * 4,
    justifyContent: 'space-between',
  },

  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: UNIT * 0.2,
    height: '100%',
    marginHorizontal: UNIT * 0.2,
    minHeight: UNIT * 0.5,
    width: UNIT * 0.5,
  },

  barTiny: {
    marginHorizontal: UNIT * 0.1,
    minHeight: UNIT * 0.2,
    width: UNIT * 0.2,
  },
});

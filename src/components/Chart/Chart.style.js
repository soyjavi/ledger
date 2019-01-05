import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;
const BAR_SIZE = UNIT * 0.2;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    height: UNIT * 4.4,
    justifyContent: 'space-between',
  },

  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_SIZE,
    height: '100%',
    marginHorizontal: BAR_SIZE,
    minHeight: BAR_SIZE * 2,
    width: BAR_SIZE * 2,
  },

  barTiny: {
    marginHorizontal: BAR_SIZE / 2,
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },
});

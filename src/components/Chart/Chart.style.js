import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT } = THEME;
const BAR_SIZE = UNIT * 0.3;
const CONTAINER_SIZE = UNIT * 4.8;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: CONTAINER_SIZE,
    justifyContent: 'space-between',
  },

  item: {
    borderTopLeftRadius: UNIT,
    borderTopRightRadius: UNIT,
    height: '100%',
    minHeight: BAR_SIZE,
    minWidth: BAR_SIZE,
    flex: 1,
    marginHorizontal: 2,
  },
});

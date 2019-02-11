import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT } = THEME;
const BAR_SIZE = UNIT * 0.2;
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
    borderRadius: BAR_SIZE / 2,
    height: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },
});

import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, UNIT } = THEME;
const BAR_SIZE = UNIT * 0.8;
const CONTAINER_SIZE = UNIT * 4.8;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: CONTAINER_SIZE,
    justifyContent: 'space-between',
  },

  detailed: {
    borderTopLeftRadius: BAR_SIZE / 2,
    borderTopRightRadius: BAR_SIZE / 2,
    height: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },

  item: {
    borderRadius: BORDER_RADIUS,
    height: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },
});

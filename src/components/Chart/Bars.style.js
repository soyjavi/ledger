import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;
const BAR_SIZE = UNIT * 0.6;
const CONTAINER_SIZE = UNIT * 6.4;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: CONTAINER_SIZE,
    justifyContent: 'space-between',
    marginVertical: UNIT * 0.1,
  },

  inverted: {
    height: CONTAINER_SIZE / 2,
    alignItems: 'flex-start',
    marginHorizontal: (BAR_SIZE / 2) - UNIT * 0.1,
  },

  item: {
    backgroundColor: COLOR.BASE,
    // borderRadius: BAR_SIZE,
    height: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },

  itemInverted: {
    width: UNIT * 0.1,
  },
});

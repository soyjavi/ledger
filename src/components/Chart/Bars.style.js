import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;
const BAR_SIZE = UNIT * 0.6;
const CONTAINER_SIZE = UNIT * 4.8;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: CONTAINER_SIZE,
    minHeight: CONTAINER_SIZE,
    marginVertical: UNIT * 0.1,
    justifyContent: 'space-between',
  },

  inverted: {
    alignItems: 'flex-start',
    height: CONTAINER_SIZE / 2,
    marginHorizontal: (BAR_SIZE / 2) - UNIT * 0.1,
    minHeight: CONTAINER_SIZE / 2,
  },

  item: {
    backgroundColor: COLOR.BASE,
    height: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },

  itemInverted: {
    width: BAR_SIZE / 3,
    minHeight: BAR_SIZE / 3,
  },
});

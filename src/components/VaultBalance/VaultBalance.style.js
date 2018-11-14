import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = UNIT * 1.8;

export default StyleSheet.create({
  bullet: {
    backgroundColor: COLOR.BASE,
    borderRadius: BULLET_SIZE / 2,
    color: COLOR.WHITE,
    fontSize: BULLET_SIZE / 1.8,
    height: BULLET_SIZE,
    lineHeight: BULLET_SIZE,
    marginRight: UNIT / 2,
    textAlign: 'center',
    transform: [{ rotate: '180deg' }],
    width: BULLET_SIZE,
  },

  cashflow: {
    flex: 1,
    alignSelf: 'flex-end',
  },

  cashflowPrice: {
    marginRight: OFFSET,
  },

  container: {
    paddingHorizontal: OFFSET,
    paddingVertical: OFFSET * 2,
  },

  marginRight: {
    marginLeft: UNIT,
    transform: [{ rotate: '0deg' }],
  },

  row: LAYOUT.STYLE.ROW,
});

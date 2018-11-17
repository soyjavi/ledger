import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = UNIT * 2;

export default StyleSheet.create({
  bullet: {
    ...LAYOUT.STYLE.CENTERED,
    backgroundColor: COLOR.BASE,
    borderRadius: BULLET_SIZE / 2,
    height: BULLET_SIZE,
    marginRight: UNIT / 2,
    width: BULLET_SIZE,
  },

  bulletExpenses: {
    marginLeft: OFFSET,
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

  icon: {
    height: BULLET_SIZE * 0.6,
    width: BULLET_SIZE * 0.6,
  },

  row: LAYOUT.STYLE.ROW,
});

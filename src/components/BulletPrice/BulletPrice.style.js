import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;

export default StyleSheet.create({
  bullet: {
    ...LAYOUT.STYLE.CENTERED,
    borderWidth: UNIT / 4,
    borderRadius: UNIT / 2,
    height: UNIT,
    marginRight: UNIT / 2,
    width: UNIT,
    opacity: 0.75,
  },

  container: LAYOUT.STYLE.ROW,

  expenses: {
    borderColor: COLOR.ERROR,
  },

  incomes: {
    borderColor: COLOR.SUCCESS,
  },
});

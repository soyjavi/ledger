import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;
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

  container: LAYOUT.STYLE.ROW,

  icon: {
    height: BULLET_SIZE * 0.6,
    width: BULLET_SIZE * 0.6,
  },
});

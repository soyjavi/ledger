import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  heading: {
    marginTop: SPACE.REGULAR,
    paddingHorizontal: SPACE.MEDIUM,
    // justifyContent: 'space-between',
  },

  icon: {
    marginRight: -SPACE.XS,
  },

  row: LAYOUT.STYLE.ROW,

  tag: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: SPACE.L,
    justifyContent: 'center',
    marginRight: SPACE.XS,
    paddingHorizontal: SPACE.XS,
  },
});

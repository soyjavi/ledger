import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginTop: SPACE.XS,
    marginBottom: SPACE.S,
  },

  heading: {
    paddingHorizontal: SPACE.MEDIUM,
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
    paddingVertical: 0,
    width: 'auto',
  },
});

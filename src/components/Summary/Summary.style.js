import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { SPACE, UNIT } = THEME;

export default StyleSheet.create({
  balance: {
    fontSize: UNIT * 3.6,
  },

  container: {
    justifyContent: 'flex-start',
    minHeight: UNIT * 16,
    paddingHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
  },

  expand: {
    flex: 1,
  },

  image: {
    height: UNIT * 1.4,
    width: UNIT * 1.4,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,

  spaceBetween: {
    justifyContent: 'space-between',
  },
});

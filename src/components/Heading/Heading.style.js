import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, SPACE } = THEME;

export default StyleSheet.create({
  breakline: {
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    paddingVertical: SPACE.XS,
    marginLeft: SPACE.MEDIUM,
    marginRight: SPACE.MEDIUM,
  },

  content: {
    flex: 1,
  },

  logo: {
    height: UNIT * 1.6,
    width: UNIT * 2.2,
    marginBottom: SPACE.XXS / 2,
    marginRight: SPACE.XXS,
  },
});

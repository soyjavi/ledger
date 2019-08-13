import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, SPACE } = THEME;

export default StyleSheet.create({
  breakline: {
    backgroundColor: COLOR.BASE,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: SPACE.MEDIUM,
    marginVertical: SPACE.XXS,
  },

  content: {
    flex: 1,
  },

  image: {
    height: UNIT * 1.6,
    width: UNIT * 1.6,
    marginRight: SPACE.XXS,
  },

  subtitle: {
    fontSize: UNIT * 1.6,
  },
});

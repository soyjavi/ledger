import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { COLOR, SPACE } = THEME;
const BAR_HEIGHT = SPACE.S + SPACE.XS / 2;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_HEIGHT / 2,
    height: BAR_HEIGHT,
    minWidth: BAR_HEIGHT,
  },

  barContainer: {
    marginVertical: SPACE.XS,
  },

  barSmall: {
    height: BAR_HEIGHT / 2,
    minWidth: BAR_HEIGHT / 2,
  },

  text: {
    flex: 1,
  },
});

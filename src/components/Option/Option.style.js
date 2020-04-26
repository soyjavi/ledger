import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, FONT, SPACE, UNIT } = THEME;

const BOX_SIZE = UNIT * 8;

export default StyleSheet.create({
  container: {
    width: BOX_SIZE,
    maxWidth: BOX_SIZE,
    height: BOX_SIZE,
  },

  content: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.XS,
    height: '100%',
    width: '100%',
  },

  image: {
    height: SPACE.L,
    width: SPACE.L,
  },

  legend: FONT.LEGEND,
});

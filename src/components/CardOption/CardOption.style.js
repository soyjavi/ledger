import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, FONT, SPACE, UNIT } = THEME;

const CARD_OPTION_WIDTH = UNIT * 8;

export default StyleSheet.create({
  box: {
    minWidth: CARD_OPTION_WIDTH,
  },

  container: {
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

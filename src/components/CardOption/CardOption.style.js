import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, FONT, SPACE, UNIT } = THEME;
const IMAGE_SIZE = SPACE.L;

const CARD_OPTION_WIDTH = UNIT * 8;

export default StyleSheet.create({
  box: {
    width: CARD_OPTION_WIDTH,
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
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },

  legend: FONT.LEGEND,
});

import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, FONT, SPACE } = THEME;
const IMAGE_SIZE = SPACE.L;

export default StyleSheet.create({
  box: {
    marginRight: SPACE.S,
  },

  container: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    paddingVertical: SPACE.M,
    paddingHorizontal: SPACE.S,
  },

  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },

  legend: FONT.LEGEND,
});

import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { OPTION_SIZE } from '../Option';

const { BORDER_RADIUS, FONT, COLOR, SPACE } = THEME;

const IMAGE_SIZE = SPACE.XL + SPACE.M;

export default StyleSheet.create({
  buttons: {
    position: 'absolute',
    bottom: -OPTION_SIZE / 2,
  },

  container: {
    marginBottom: OPTION_SIZE / 2 + SPACE.M,
    marginTop: SPACE.XL,
    marginHorizontal: SPACE.XL,
  },

  content: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    paddingTop: IMAGE_SIZE / 2 + SPACE.XS,
    paddingBottom: OPTION_SIZE / 2 + SPACE.M,
  },

  legend: FONT.LEGEND,

  image: {
    borderRadius: BORDER_RADIUS,
    position: 'absolute',
    top: -(IMAGE_SIZE / 2),
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    overflow: 'hidden',
  },
});

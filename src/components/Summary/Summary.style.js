import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { SPACE, UNIT } = THEME;

const FONT_SIZE = UNIT * 4;
const IMAGE_SIZE = UNIT * 2;

export default StyleSheet.create({
  balance: {
    fontSize: FONT_SIZE,
    lineHeight: FONT_SIZE,
  },

  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});

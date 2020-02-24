import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { UNIT } = THEME;
export const CARD_WIDTH = UNIT * 8;

export default StyleSheet.create({
  slider: {
    height: CARD_WIDTH,
  },
});
